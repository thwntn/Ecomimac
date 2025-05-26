namespace ReferenceService;

public class DiscountService(
    DatabaseContext databaseContext,
    IJwt jwtService,
    ITagRepository tagRepository,
    ICache cacheService,
    IConnectionHub connectionHubService
) : IDiscount
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly ICache _cacheService = cacheService;
    private readonly ITagRepository _tagRepository = tagRepository;
    private readonly IConnectionHub _connectionHubService = connectionHubService;
    private readonly IJwt _jwtService = jwtService;

    ///
    private readonly int RECENT_NUMBER = 6;
    private readonly string TEMPLATE_CHART_TIME = "dd-MM";

    public Pagination<Discount> List(
        Guid profileId,
        DiscountDataTransformer.DiscountQuery discountQuery
    )
    {
        IQueryable<Discount> discounts = _databaseContext
            .Discount.Include(discount => discount.DiscountTags)
            .ThenInclude(discountTag => discountTag.Tag)
            .Where(discount => profileId == discount.ProfileId)
            .OrderByDescending(discount => discount.Created);

        IQueryable<Discount> discountFilters = FilterDiscount(
            discounts,
            discountQuery
        );

        return new(discountFilters, discountQuery);
    }

    private static IQueryable<Discount> FilterDiscount(
        IQueryable<Discount> discounts,
        DiscountDataTransformer.DiscountQuery discountQuery
    )
    {
        if (discountQuery.DiscountType == DiscountType.PRODUCT)
            return discounts.Where(discount =>
                discount.DiscountType == DiscountType.PRODUCT
            );

        if (discountQuery.DiscountType == DiscountType.INVOICE)
            return discounts.Where(discount =>
                discount.DiscountType == DiscountType.INVOICE
            );

        return discounts;
    }

    public Discount Create(
        Guid profileId,
        DiscountDataTransformer.Create create
    )
    {
        Discount discount = Mapper.Map<Discount>(create);
        discount.ProfileId = _jwtService.Information().ProfileId;
        discount.Created = Timebase.Now();
        discount.Code = Cryptography.RandomCode();

        _databaseContext.Add(discount);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Discount) + profileId;
        _cacheService.Reset(nameofCache);

        UpdateTag(profileId, discount.Id, create.TagIds);
        Refresh(profileId);
        return discount;
    }

    public void UpdateTag(
        Guid profileId,
        Guid discountId,
        IEnumerable<Guid> tagIds
    )
    {
        DatabaseContext databaseContext = _tagRepository.AsDatabaseContext();

        databaseContext.RemoveRange(
            databaseContext.DiscountTag.Where(discountTag =>
                discountTag.DiscountId == discountId
            )
        );

        databaseContext.AddRange(
            _tagRepository
                .GetByCondition(tag =>
                    tag.ProfileId == profileId && tagIds.Contains(tag.Id)
                )
                .Select(tag => new DiscountTag(discountId, tag.Id))
        );
        databaseContext.SaveChanges();
    }

    public Discount Update(
        Guid profileId,
        DiscountDataTransformer.Update update
    )
    {
        Discount discount =
            _databaseContext.Discount.FirstOrDefault(discount =>
                discount.Id == update.Id
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DISCOUNT
            );

        Discount mapped = Mapper.Merge(discount, update);
        mapped.Updated = Timebase.Now();

        _databaseContext.Update(mapped);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Discount) + profileId;
        _cacheService.Reset(nameofCache);

        UpdateTag(profileId, discount.Id, update.TagIds);
        Refresh(profileId);
        return mapped;
    }

    public string Remove(Guid profileId, Guid discountId)
    {
        Discount discount =
            _databaseContext
                .Discount.Include(discount => discount.InvoiceDiscounts)
                .FirstOrDefault(discount =>
                    discount.Id == discountId
                    && discount.ProfileId == _jwtService.Information().ProfileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DISCOUNT
            );

        if (discount.InvoiceDiscounts.Count > 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.CANNOT_REMOVE_DISCOUNT
            );

        _databaseContext.Remove(discount);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Discount) + profileId;
        _cacheService.Reset(nameofCache);

        Refresh(profileId);
        return string.Empty;
    }

    public Discount ChangeStatus(
        Guid profileId,
        Guid discountId,
        DiscountStatus discountStatus
    )
    {
        Discount discount =
            _databaseContext.Discount.FirstOrDefault(discount =>
                discount.Id == discountId
                && discount.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DISCOUNT
            );

        discount.Status = discountStatus;
        _databaseContext.Update(discount);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Discount) + profileId;
        _cacheService.Reset(nameofCache);

        Refresh(profileId);
        return discount;
    }

    public DiscountObject.Counter Info(Guid discountId)
    {
        Discount discount =
            _databaseContext
                .Discount.Include(discount => discount.InvoiceDiscounts)
                .ThenInclude(invoiceDiscounts => invoiceDiscounts.Invoice)
                .ThenInclude(invoice => invoice.Profile)
                .Include(discount => discount.Profile)
                .Include(discount => discount.DiscountTags)
                .ThenInclude(discountTag => discountTag.Tag)
                .FirstOrDefault(discount =>
                    discount.Id == discountId
                    && discount.ProfileId == _jwtService.Information().ProfileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DISCOUNT
            );

        DiscountObject.Counter counter =
            Mapper.Map<DiscountObject.Counter>(discount);
        counter.Applied = discount.InvoiceDiscounts.Count;

        DateTime current = Timebase.Now();
        long thisMonth = TotalDiscountAmount(
            discount,
            current.Month,
            current.Year
        );

        DateTime previous = Timebase.Now().AddMonths(-1);
        long lastMonth = TotalDiscountAmount(
            discount,
            previous.Month,
            previous.Year
        );

        double percent = (thisMonth - lastMonth) / (double)lastMonth * 100;
        counter.Compare = (int)percent;

        return counter;
    }

    private static long TotalDiscountAmount(
        Discount discount,
        int month,
        int year
    )
    {
        double sumAmount = discount
            .InvoiceDiscounts.Where(invoiceDiscount =>
                invoiceDiscount.Created.Month == month
                && invoiceDiscount.Created.Year == year
            )
            .Select(invoiceDiscount => invoiceDiscount.Amount)
            .Sum();
        return long.Parse(sumAmount.ToString());
    }

    public IEnumerable<Discount> Counter(Guid profileId)
    {
        IEnumerable<Discount> discounts = _databaseContext
            .Discount.Where(discount => discount.ProfileId == profileId)
            .Include(discount => discount.DiscountTags)
            .ThenInclude(discountTag => discountTag.Tag)
            .Include(discount => discount.InvoiceDiscounts)
            .OrderByDescending(discount => discount.InvoiceDiscounts.Count)
            .Take(3);

        List<DiscountObject.Counter> counter = Mapper.Map<
            List<DiscountObject.Counter>
        >(discounts);
        foreach (DiscountObject.Counter discount in counter)
            discount.Applied = discount.InvoiceDiscounts.Count;

        return counter;
    }

    public Pagination<InvoiceDiscount> Invoice(
        Guid profileId,
        Guid discountId,
        QueryOptions queryOptions
    )
    {
        Discount discount =
            _databaseContext
                .Discount.Include(discount => discount.InvoiceDiscounts)
                .ThenInclude(InvoiceDiscount => InvoiceDiscount.Invoice)
                .ThenInclude(InvoiceDiscount => InvoiceDiscount.Profile)
                .FirstOrDefault(discount =>
                    discount.Id == discountId && discount.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DISCOUNT
            );

        IQueryable<InvoiceDiscount> invoiceDiscounts = discount
            .InvoiceDiscounts.OrderByDescending(invoiceDiscount =>
                invoiceDiscount.Created
            )
            .AsQueryable();

        return new(invoiceDiscounts, queryOptions);
    }

    public IEnumerable<Discount> Recent(Guid profileId)
    {
        IEnumerable<Discount> discount = _databaseContext
            .Discount.Where(discount => discount.ProfileId == profileId)
            .OrderByDescending(discount => discount.Created)
            .Take(RECENT_NUMBER);

        return discount;
    }

    public IEnumerable<DiscountObject.Chart> Chart(
        Guid profileId,
        Guid discountId
    )
    {
        DateTime dateTime = Timebase.Now();
        DateTime week = dateTime.AddDays(-7);

        IEnumerable<DiscountObject.Chart> charts = _databaseContext
            .InvoiceDiscount.Where(invoiceDiscount =>
                invoiceDiscount.Discount.ProfileId == profileId
                && invoiceDiscount.DiscountId == discountId
                && invoiceDiscount.Created > week
            )
            .GroupBy(
                invoiceDiscount => invoiceDiscount.Created.Date,
                invoiceDiscount => invoiceDiscount.Amount,
                (date, amount) =>
                    new DiscountObject.Chart(
                        date.ToString(TEMPLATE_CHART_TIME),
                        long.Parse(amount.Sum().ToString())
                    )
            );

        return charts;
    }

    private void Refresh(Guid profileId)
    {
        _connectionHubService.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.DISCOUNT),
            default
        );
    }
}
