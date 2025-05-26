using System.Data;

namespace ReferenceService;

public class SaleProgramService(
    DatabaseContext databaseContext,
    ISaleProgramRepository saleProgramRepository,
    IDiscountRepository discountRepository,
    IProductRepository productRepository,
    IPromotionRepository promotionRepository,
    IInvoiceRepository invoiceRepository,
    IConnectionHub connectionHubService
) : ISaleProgram
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly ISaleProgramRepository _saleProgramRepository =
        saleProgramRepository;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;
    private readonly IDiscountRepository _discountRepository =
        discountRepository;
    private readonly IProductRepository _productRepository = productRepository;
    private readonly IInvoiceRepository _invoiceRepository = invoiceRepository;
    private readonly IPromotionRepository _promotionRepository =
        promotionRepository;

    public SaleProgram Create(
        Guid profileId,
        SaleProgramDataTransformer.Create create
    )
    {
        SaleProgram saleProgram = Mapper.Map<SaleProgram>(create);
        SaleProgramObject.ChildrenElementObject childrenElement =
            ChildrenInformation(create);
        saleProgram.ProfileId = profileId;

        saleProgram.SaleProgramDiscounts = Mapper.Map<
            List<SaleProgramDiscount>
        >(
            childrenElement.Discounts.Select(
                discount => new SaleProgramDiscount(discount.Id, saleProgram.Id)
            )
        );

        saleProgram.SaleProgramPromotions = Mapper.Map<
            List<SaleProgramPromotion>
        >(
            childrenElement.Promotions.Select(
                promotion => new SaleProgramPromotion(
                    promotion.Id,
                    saleProgram.Id
                )
            )
        );

        saleProgram.SaleProgramProducts = Mapper.Map<
            List<SaleProgramProduct>
        >(
            childrenElement.Products.Select(product => new SaleProgramProduct(
                product.Id,
                saleProgram.Id
            ))
        );

        foreach (Discount discount in childrenElement.Discounts)
            discount.Status = DiscountStatus.Suspend;

        _databaseContext.UpdateRange(childrenElement.Discounts);
        _databaseContext.SaleProgram.Add(saleProgram);
        _databaseContext.SaveChanges();

        Update(profileId);
        return saleProgram;
    }

    public SaleProgramObject.Counter Counter(Guid profileId)
    {
        IEnumerable<SaleProgram> salePrograms = _saleProgramRepository
            .GetByCondition(saleProgram => saleProgram.ProfileId == profileId)
            .Include(saleProgram => saleProgram.SaleProgramProducts)
            .ThenInclude(saleProgramProduct => saleProgramProduct.Product)
            .ThenInclude(product => product.InvoiceProducts);

        IEnumerable<Product> products = salePrograms
            .SelectMany(saleProgram => saleProgram.SaleProgramProducts)
            .Select(saleProgramProduct => saleProgramProduct.Product);

        long totalCost = products
            .SelectMany(product => product.InvoiceProducts)
            .Select(invoiceProduct =>
                invoiceProduct.Price * invoiceProduct.Quantity
            )
            .Sum();

        return new(totalCost, salePrograms.Count(), products.Count());
    }

    public SaleProgramObject.Revenue Revenue(Guid profileId, Guid saleProgramId)
    {
        SaleProgram saleProgram = _saleProgramRepository
            .Include(saleProgram => saleProgram.SaleProgramProducts)
            .ThenInclude(saleProgramProduct => saleProgramProduct.Product)
            .ThenInclude(product => product.InvoiceProducts)
            .FirstOrDefault(saleProgram =>
                saleProgram.ProfileId == profileId
                && saleProgram.Id == saleProgramId
            );

        IEnumerable<Product> products = saleProgram.SaleProgramProducts.Select(
            saleProgramProduct => saleProgramProduct.Product
        );

        long totalCost = products
            .SelectMany(product => product.InvoiceProducts)
            .Select(invoiceProduct =>
                invoiceProduct.Price * invoiceProduct.Quantity
            )
            .Sum();

        IEnumerable<SaleProgramObject.SumRevenue> sumRevenue = _databaseContext
            .InvoiceProduct.Where(invoiceProduct =>
                invoiceProduct.Product.SaleProgramProducts.Any(
                    saleProgramProduct =>
                        saleProgramProduct.SaleProgramId == saleProgramId
                )
            )
            .AsEnumerable()
            .Where(invoiceProduct =>
                products.Any(product => product.Id == invoiceProduct.ProductId)
            )
            .GroupBy(invoiceProduct => invoiceProduct.ProductId)
            .Select(keyValuePair =>
            {
                long productCost = keyValuePair
                    .Select(invoiceProduct => invoiceProduct.Price)
                    .Sum();
                double percent = productCost / (double)totalCost;
                return new SaleProgramObject.SumRevenue(
                    products.First(product => product.Id == keyValuePair.Key),
                    productCost,
                    percent
                );
            })
            .Take(3);

        return new(totalCost, sumRevenue);
    }

    public SaleProgram Information(Guid profileId, Guid saleProgramId)
    {
        SaleProgram saleProgram =
            _databaseContext
                .SaleProgram.Include(saleProgram =>
                    saleProgram.SaleProgramDiscounts
                )
                .ThenInclude(saleProgramDiscount =>
                    saleProgramDiscount.Discount
                )
                .Include(saleProgram => saleProgram.SaleProgramProducts)
                .ThenInclude(saleProgramProduct => saleProgramProduct.Product)
                .ThenInclude(product => product.ImageProducts)
                .Include(saleProgram => saleProgram.SaleProgramPromotions)
                .ThenInclude(saleProgramPromotion =>
                    saleProgramPromotion.Promotion
                )
                .FirstOrDefault(saleProgram =>
                    saleProgram.Id == saleProgramId
                    && saleProgram.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SALE_PROGRAM
            );

        return saleProgram;
    }

    public SaleProgram Update(
        Guid profileId,
        SaleProgramDataTransformer.Update update
    )
    {
        SaleProgram saleProgram =
            _databaseContext
                .SaleProgram.Include(saleProgram =>
                    saleProgram.SaleProgramDiscounts
                )
                .Include(saleProgram => saleProgram.SaleProgramProducts)
                .Include(saleProgram => saleProgram.SaleProgramPromotions)
                .FirstOrDefault(saleProgram =>
                    saleProgram.Id == update.Id
                    && saleProgram.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SALE_PROGRAM
            );

        saleProgram = Mapper.Merge(saleProgram, update);

        IEnumerable<SaleProgramDiscount> newDiscount =
            saleProgram.SaleProgramDiscounts.Concat(
                update
                    .DiscountIds.Where(id =>
                        saleProgram.SaleProgramDiscounts.Any(
                            saleProgramDiscount =>
                                saleProgramDiscount.DiscountId == id
                        )
                    )
                    .Select(id => new SaleProgramDiscount(id, saleProgram.Id))
            );

        _databaseContext.Update(saleProgram);
        _databaseContext.SaveChanges();
        _databaseContext.ChangeTracker.Clear();

        UpdateDiscount(
            saleProgram.Id,
            saleProgram.SaleProgramDiscounts,
            update
        );
        UpdateProduct(saleProgram.Id, saleProgram.SaleProgramProducts, update);
        UpdatePromotion(
            saleProgram.Id,
            saleProgram.SaleProgramPromotions,
            update
        );

        Update(profileId);
        return saleProgram;
    }

    private IEnumerable<SaleProgramDiscount> UpdateDiscount(
        Guid saleProgramId,
        IEnumerable<SaleProgramDiscount> saleProgramDiscounts,
        SaleProgramDataTransformer.Update update
    )
    {
        IEnumerable<SaleProgramDiscount> saleProgramDiscountGenerate =
            _discountRepository
                .GetByCondition(discount =>
                    update.DiscountIds.Contains(discount.Id)
                )
                .Select(discount => new SaleProgramDiscount(
                    discount.Id,
                    saleProgramId
                ));

        _databaseContext.RemoveRange(saleProgramDiscounts);
        _databaseContext.AddRange(saleProgramDiscountGenerate);
        _databaseContext.SaveChanges();

        return saleProgramDiscountGenerate;
    }

    public Pagination<Invoice> Invoices(
        Guid profileId,
        Guid saleProgramId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Invoice> invoices = _invoiceRepository
            .Include(invoice => invoice.InvoiceProducts)
            .ThenInclude(invoiceProduct => invoiceProduct.Product)
            .ThenInclude(product => product.SaleProgramProducts)
            .Include(invoice => invoice.Customer)
            .Where(invoice => invoice.ProfileId == profileId)
            .OrderByDescending(invoice => invoice.Created);
        // .AsEnumerable()
        // .Where(invoice =>
        //     invoice.InvoiceProducts.Any(invoiceProduct =>
        //         invoiceProduct.Product.SaleProgramProducts.Any(
        //             saleProgramProduct =>
        //                 saleProgramProduct.SaleProgramId == saleProgramId
        //         )
        //     )
        // );

        return new(invoices, queryOptions);
    }

    private IEnumerable<SaleProgramProduct> UpdateProduct(
        Guid saleProgramId,
        IEnumerable<SaleProgramProduct> saleProgramProducts,
        SaleProgramDataTransformer.Update update
    )
    {
        IEnumerable<SaleProgramProduct> saleProgramProductGenerate =
            _productRepository
                .GetByCondition(discount =>
                    update.ProductIds.Contains(discount.Id)
                )
                .Select(discount => new SaleProgramProduct(
                    discount.Id,
                    saleProgramId
                ));

        _databaseContext.RemoveRange(saleProgramProducts);
        _databaseContext.AddRange(saleProgramProductGenerate);
        _databaseContext.SaveChanges();

        return saleProgramProductGenerate;
    }

    private IEnumerable<SaleProgramPromotion> UpdatePromotion(
        Guid saleProgramId,
        IEnumerable<SaleProgramPromotion> saleProgramPromotions,
        SaleProgramDataTransformer.Update update
    )
    {
        IEnumerable<SaleProgramPromotion> saleProgramPromotionGenerate =
            _promotionRepository
                .GetByCondition(discount =>
                    update.PromotionIds.Contains(discount.Id)
                )
                .Select(discount => new SaleProgramPromotion(
                    discount.Id,
                    saleProgramId
                ));

        _databaseContext.RemoveRange(saleProgramPromotions);
        _databaseContext.AddRange(saleProgramPromotionGenerate);
        _databaseContext.SaveChanges();

        return saleProgramPromotionGenerate;
    }

    private SaleProgramObject.ChildrenElementObject ChildrenInformation(
        SaleProgramDataTransformer.Create create
    )
    {
        IEnumerable<Discount> discounts = _databaseContext.Discount.Where(
            discount => create.DiscountIds.Contains(discount.Id)
        );

        IEnumerable<Promotion> promotions = _databaseContext.Promotion.Where(
            promotion => create.PromotionIds.Contains(promotion.Id)
        );

        IEnumerable<Product> products = _databaseContext.Product.Where(
            product => create.ProductIds.Contains(product.Id)
        );

        return new(promotions, products, discounts);
    }

    public Pagination<SaleProgram> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IQueryable<SaleProgram> salePrograms = _databaseContext
            .SaleProgram.Include(saleProgram => saleProgram.Profile)
            .Include(saleProgram => saleProgram.SaleProgramDiscounts)
            .ThenInclude(saleProgramDiscount => saleProgramDiscount.Discount)
            .Include(saleProgram => saleProgram.SaleProgramPromotions)
            .ThenInclude(saleProgramPromotion => saleProgramPromotion.Promotion)
            .Include(saleProgram => saleProgram.SaleProgramProducts)
            .ThenInclude(saleProgramProduct => saleProgramProduct.Product)
            .Where(saleProgram => saleProgram.ProfileId == profileId);

        return new(salePrograms, queryOptions);
    }

    public IEnumerable<SaleProgramObject.Report> Report(
        Guid profileId,
        Guid saleProgramId
    )
    {
        SaleProgram saleProgram = _saleProgramRepository.GetById(saleProgramId);
        if (saleProgram.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SALE_PROGRAM
            );

        IEnumerable<SaleProgramObject.Report> reports = _invoiceRepository
            .Raw()
            .GroupBy(invoice => invoice.Created)
            .Select(invoiceGroup => new SaleProgramObject.Report(
                invoiceGroup.Key,
                invoiceGroup
                    .Select(invoiceGroup => invoiceGroup.LatestPrice)
                    .Sum()
            ))
            .AsEnumerable()
            .Where(report => report.Amount > 0);

        return reports;
    }

    public IEnumerable<SaleProgramObject.Status> Status()
    {
        string define = File.ReadAllText(
            $"{Directory.GetCurrentDirectory()}/Common/Metadata/SaleProgramStatus.json"
        );

        IEnumerable<SaleProgramObject.Status> status =
            Mapper.Deserialize<IEnumerable<SaleProgramObject.Status>>(
                define
            );

        return status;
    }

    public SaleProgram UpdateStatus(
        Guid profileId,
        Guid saleProgramId,
        SaleProgramDataTransformer.UpdateStatus updateStatus
    )
    {
        SaleProgram saleProgram = _saleProgramRepository.GetById(saleProgramId);

        if (saleProgram.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SALE_PROGRAM
            );

        saleProgram.Status = updateStatus.Status;
        _saleProgramRepository.Update(saleProgram);
        return saleProgram;
    }

    public string Remove(Guid profileId, Guid saleProgramId)
    {
        SaleProgram saleProgram =
            _databaseContext.SaleProgram.FirstOrDefault(saleProgram =>
                saleProgram.Id == saleProgramId
                && saleProgram.ProfileId == profileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SALE_PROGRAM
            );

        _databaseContext.Remove(saleProgram);
        _databaseContext.SaveChanges();

        Update(profileId);
        return string.Empty;
    }

    private void Update(Guid profileId)
    {
        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.SALE_PROGRAM),
            default
        );
    }
}
