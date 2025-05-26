namespace ReferenceService;

public class PromotionService(
    DatabaseContext databaseContext,
    IProductRepository productRepository,
    ITagRepository tagRepository,
    IConnectionHub connectionHubService
) : IPromotion
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IProductRepository _productRepository = productRepository;
    private readonly ITagRepository _tagRepository = tagRepository;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;

    public Pagination<Promotion> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Promotion> promotions = _databaseContext
            .Promotion.Include(promotion => promotion.Profile)
            .Include(promotion => promotion.PromotionProducts)
            .Include(promotion => promotion.PromotionTags)
            .ThenInclude(promotionTag => promotionTag.Tag)
            .Where(promotion => promotion.ProfileId == profileId);

        return new(promotions, queryOptions);
    }

    private void UpdateTag(
        Guid profileId,
        Guid promotionId,
        IEnumerable<Guid> tagIds
    )
    {
        DatabaseContext databaseContext = _tagRepository.AsDatabaseContext();

        databaseContext.RemoveRange(
            databaseContext.PromotionTag.Where(promotionTag =>
                promotionTag.PromotionId == promotionId
            )
        );

        databaseContext.AddRange(
            _tagRepository
                .GetByCondition(tag =>
                    tagIds.Contains(tag.Id) && tag.ProfileId == profileId
                )
                .Select(tag => new PromotionTag(promotionId, tag.Id))
        );
        databaseContext.SaveChanges();
    }

    public Promotion Information(Guid profileId, Guid promotionId)
    {
        Promotion promotion =
            _databaseContext
                .Promotion.Include(promotion => promotion.PromotionProducts)
                .ThenInclude(promotionProduct => promotionProduct.BuyProduct)
                .ThenInclude(product => product.ImageProducts)
                .Include(promotion => promotion.PromotionProducts)
                .ThenInclude(promotionProduct => promotionProduct.BuyProduct)
                .ThenInclude(product => product.Profile)
                .FirstOrDefault(promotion =>
                    promotion.ProfileId == profileId
                    && promotion.Id == promotionId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PROMOTIONAL
            );

        IEnumerable<Product> products = _productRepository
            .Include(product => product.ImageProducts)
            .Where(product =>
                promotion
                    .PromotionProducts.Select(promotionProduct =>
                        promotionProduct.FreeProductId
                    )
                    .Any(id => product.Id == id)
            );

        foreach (
            PromotionProduct promotionProduct in promotion.PromotionProducts
        )
            promotionProduct.FreeProduct = products.FirstOrDefault(product =>
                product.Id == promotionProduct.FreeProductId
            );

        return promotion;
    }

    public Promotion Create(
        Guid profileId,
        PromotionDataTransformer.Create create
    )
    {
        Promotion promotion = Mapper.Map<Promotion>(create);
        promotion.ProfileId = profileId;

        _databaseContext.Promotion.Add(promotion);
        _databaseContext.SaveChanges();

        UpdateTag(profileId, promotion.Id, create.TagIds);
        Refresh(profileId);

        return promotion;
    }

    public Promotion Update(
        Guid profileId,
        PromotionDataTransformer.Update update
    )
    {
        Promotion promotion =
            _databaseContext.Promotion.FirstOrDefault(promotion =>
                promotion.Id == update.Id && promotion.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PROMOTIONAL
            );

        Promotion record = Mapper.Merge(promotion, update);
        _databaseContext.Update(record);
        _databaseContext.SaveChanges();

        UpdateTag(profileId, promotion.Id, update.TagIds);
        Refresh(profileId);

        return record;
    }

    public string Remove(Guid profileId, Guid promotionId)
    {
        Promotion promotion =
            _databaseContext.Promotion.FirstOrDefault(promotion =>
                promotion.Id == promotionId && promotion.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PROMOTIONAL
            );

        _databaseContext.Remove(promotion);
        _databaseContext.SaveChanges();

        Refresh(profileId);

        return string.Empty;
    }

    private void Refresh(Guid profileId)
    {
        _connectionHubService.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.PROMOTION),
            default
        );
    }
}
