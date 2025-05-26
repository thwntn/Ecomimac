namespace ReferenceService;

public class ProductService(
    DatabaseContext databaseContext,
    IJwt jwtService,
    ICache cacheService,
    ITagRepository tagRepository,
    IConnectionHub connectionHubService
) : IProduct
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;
    private readonly ITagRepository _tagRepository = tagRepository;
    private readonly ICache _cacheService = cacheService;
    private readonly IJwt _jwtService = jwtService;

    public Pagination<Product> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Product> products = _databaseContext
            .Product.Include(product => product.ImageProducts)
            .Include(product => product.InvoiceProducts)
            .Include(product => product.Profile)
            .Include(product => product.SaleProgramProducts)
            .Include(product => product.PromotionProducts)
            .ThenInclude(promotionProduct => promotionProduct.Promotion)
            .Include(product => product.ProductTags)
            .ThenInclude(productTag => productTag.Tag)
            .Where(product => product.ProfileId == profileId)
            .OrderByDescending(product => product.Created);

        return new(products, queryOptions);
    }

    public Product Info(Guid productId)
    {
        IEnumerable<Account> accounts = _jwtService.AccountSystem();

        Product product =
            _databaseContext
                .Product.Include(product => product.ImageProducts)
                .Include(product => product.Profile)
                .FirstOrDefault(product =>
                    product.Id == productId
                    && accounts.Any(item =>
                        item.Profile.Id == product.ProfileId
                    )
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PRODUCT
            );

        return product;
    }

    public Product Update(
        Guid profileId,
        Guid productId,
        ProductDataTransformer.Update update
    )
    {
        Product product =
            _databaseContext.Product.FirstOrDefault(product =>
                product.Id == productId && product.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PRODUCT
            );

        Product merge = Mapper.Merge(product, update);

        _databaseContext.Product.Update(merge);
        _databaseContext.SaveChanges();

        UpdateTag(profileId, product.Id, update.TagIds);
        Invoke(profileId);

        return product;
    }

    private void UpdateTag(
        Guid profileId,
        Guid productId,
        IEnumerable<Guid> tagIds
    )
    {
        DatabaseContext databaseContext = _tagRepository.AsDatabaseContext();

        databaseContext.RemoveRange(
            databaseContext.ProductTag.Where(productTag =>
                productTag.ProductId == productId
            )
        );
        //
        // Summary:
        //      Update tag name product
        //
        //  Returns:
        //
        IEnumerable<ProductTag> productTags = _tagRepository
            .GetByCondition(tag =>
                tag.ProfileId == profileId && tagIds.Contains(tag.Id)
            )
            .Select(tag => new ProductTag(productId, tag.Id));

        databaseContext.AddRange(productTags);
        databaseContext.SaveChanges();
    }

    public Product Create(Guid profileId, ProductDataTransformer.Create create)
    {
        Product product = Mapper.Map<Product>(create);
        product.Created = Timebase.Now();
        product.ProfileId = profileId;
        product.Code = Cryptography.RandomCode();

        _databaseContext.Add(product);
        _databaseContext.SaveChanges();

        UpdateTag(profileId, product.Id, create.TagIds);
        Invoke(profileId);

        return product;
    }

    public string Remove(Guid profileId, IEnumerable<Guid> productIds)
    {
        IEnumerable<Product> products = _databaseContext.Product.Where(
            product =>
                productIds.Any(productId => productId == product.Id)
                && product.ProfileId == profileId
        );

        if (products.Any() is false)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PRODUCT
            );

        _databaseContext.RemoveRange(products);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Product) + profileId;
        _cacheService.Reset(nameofCache);
        Invoke(profileId);

        return string.Empty;
    }

    public async Task<Product> UpdateImage(
        Guid profileId,
        Guid productId,
        IFormFileCollection files
    )
    {
        IEnumerable<Task<ReaderObject.Blob>> blobs = files.Select(async item =>
            await Reader.Save(item, string.Empty)
        );
        IEnumerable<ImageProduct> imageProducts = (
            await Task.WhenAll(blobs)
        ).Select(item => new ImageProduct
        {
            Url = Reader.CreateURL(item.FileName),
            ProductId = productId,
            IsMain = true,
        });

        _databaseContext.RemoveRange(
            _databaseContext.ImageProduct.Where(imageProduct =>
                imageProduct.ProductId == productId
            )
        );

        _databaseContext.AddRange(imageProducts);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Product) + profileId;
        _cacheService.Reset(nameofCache);
        Invoke(profileId);

        return Info(productId);
    }

    private void Invoke(Guid profileId)
    {
        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.UPDATE_PRODUCT),
            new object()
        );
    }
}
