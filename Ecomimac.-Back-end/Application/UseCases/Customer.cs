namespace ReferenceService;

public class CustomerService(
    DatabaseContext databaseContext,
    IJwt jwtService,
    ICache cacheService,
    ICustomerRepository customerRepository,
    ITagRepository tagRepository,
    IConnectionHub connectionHubService
) : ICustomer
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IJwt _jwtService = jwtService;
    private readonly ICache _cacheService = cacheService;
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;
    private readonly ICustomerRepository _customerRepository =
        customerRepository;
    private readonly ITagRepository _tagRepository = tagRepository;

    ///
    private readonly int RECENT_NUMBER = 6;

    public Pagination<Customer> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Customer> customers = _databaseContext
            .Customer.Include(customer => customer.Invoices)
            .Include(customer => customer.CustomerTags)
            .ThenInclude(customerTag => customerTag.Tag)
            .Where(customer => customer.ProfileId == profileId)
            .OrderByDescending(customer => customer.Created);

        return new Pagination<Customer>(customers, queryOptions);
    }

    public Customer Create(
        Guid profileId,
        CustomerDataTransformer.Create create
    )
    {
        Customer customer = new(
            create.Name,
            create.Phone,
            _jwtService.Information().ProfileId
        )
        {
            Address = create.Address,
        };

        if (create.FullName is not null)
            customer.FullName = create.FullName;

        _databaseContext.Add(customer);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Customer) + profileId;
        _cacheService.Reset(nameofCache);

        //
        //  Summary:
        //      Add tag name customer
        //
        //  Returns:
        //
        //
        if (create.TagIds.Justifiable())
            UpdateTag(profileId, customer.Id, create.TagIds);

        Refresh(profileId);
        return customer;
    }

    public string Remove(Guid profileId, Guid customerId)
    {
        Customer customer =
            _databaseContext.Customer.FirstOrDefault(customer =>
                customer.Id == customerId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CUSTOMER
            );

        _databaseContext.Remove(customer);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Customer) + profileId;
        _cacheService.Reset(nameofCache);

        Refresh(profileId);
        return string.Empty;
    }

    public async Task<Customer> AddImage(
        Guid profileId,
        Guid customerId,
        IFormFile file
    )
    {
        Customer customer =
            _databaseContext.Customer.Find(customerId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CUSTOMER
            );
        ReaderObject.Blob blob = await Reader.Save(file, string.Empty);

        customer.Image = Reader.CreateURL(blob.FileName);
        _databaseContext.Update(customer);
        _databaseContext.SaveChanges();

        customer.Image = Reader.CreateURL(customer.Image);

        string nameofCache = nameof(Customer) + profileId;
        _cacheService.Reset(nameofCache);

        return customer;
    }

    private void UpdateTag(
        Guid profileId,
        Guid customerId,
        IEnumerable<Guid> tagIds
    )
    {
        DatabaseContext databaseContext = _tagRepository.AsDatabaseContext();

        databaseContext.RemoveRange(
            databaseContext.CustomerTag.Where(customerTag =>
                tagIds.Contains(customerTag.TagId)
                && customerTag.CustomerId == customerId
            )
        );

        IEnumerable<CustomerTag> customerTags = Mapper.Map<
            List<CustomerTag>
        >(
            _tagRepository
                .GetByCondition(tag =>
                    tagIds.Contains(tag.Id) && tag.ProfileId == profileId
                )
                .Select(tag => new CustomerTag(customerId, tag.Id))
        );

        databaseContext.AddRange(customerTags);
        databaseContext.SaveChanges();
    }

    public Customer Info(Guid customerId)
    {
        Customer customer =
            _databaseContext
                .Customer.Include(customer => customer.Invoices)
                .Include(customer => customer.CustomerTags)
                .ThenInclude(customerTag => customerTag.Tag)
                .FirstOrDefault(customer => customer.Id == customerId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CUSTOMER
            );

        return customer;
    }

    public Customer Update(
        Guid profileId,
        CustomerDataTransformer.Update update
    )
    {
        Customer customer = Info(update.Id);

        customer.Name = update.Name;
        customer.Phone = update.Phone;
        customer.FullName = update.FullName;
        customer.Address = update.Address;

        _databaseContext.Update(customer);
        _databaseContext.SaveChanges();

        //
        //  Summary:
        //      Add tag name customer
        //
        //  Returns:
        //
        //
        if (update.TagIds.Justifiable())
            UpdateTag(profileId, customer.Id, update.TagIds);

        Refresh(profileId);
        return customer;
    }

    public IEnumerable<Customer> Potential(Guid profileId)
    {
        IEnumerable<Customer> customers = _databaseContext
            .Customer.Where(customer => customer.ProfileId == profileId)
            .OrderBy(customer => customer.Invoices.Count())
            .Take(RECENT_NUMBER);

        return customers;
    }

    public Pagination<Invoice> RecentInvoice(
        Guid profileId,
        Guid customerId,
        QueryOptions queryOptions
    )
    {
        IQueryable<Invoice> invoices = _databaseContext
            .Invoice.Include(invoice => invoice.Profile)
            .Where(invoice =>
                invoice.CustomerId == customerId
                && profileId == invoice.ProfileId
            )
            .OrderByDescending(invoice => invoice.Created);

        return new(invoices, queryOptions);
    }

    public void Refresh(Guid profileId)
    {
        _connectionHubService.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.CUSTOMER),
            default
        );
    }
}
