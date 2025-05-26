namespace ReferenceService;

public class FromCustomer(ICustomerRepository customerRepository)
    : IFromCustomer
{
    private readonly ICustomerRepository _customerRepository =
        customerRepository;

    private readonly IEnumerable<string> _columns =
    [
        nameof(Customer.FullName).ToLower(),
        nameof(Customer.Name).ToLower(),
        nameof(Customer.Address).ToLower(),
        nameof(Customer.EmailAddress).ToLower(),
        nameof(Customer.Phone).ToLower(),
        nameof(Customer.Birthday).ToLower(),
    ];

    public DataObject.FromCustomer Execute(Data data, QueryOptions queryOptions)
    {
        Pagination<Import> records = new(default, default);
        var pathCustomer = Query(data, queryOptions);

        IEnumerable<Import> imports = pathCustomer.Data.Select(
            customer => new Import(
                Guid.Empty,
                Mapper.Serialize(
                    Mapper
                        .Map<Dictionary<string, string>>(customer)
                        .ToDictionary(
                            key => key.Key.ToLower(),
                            value => value.Value
                        )
                )
            )
        );

        records.Page = pathCustomer.Page;
        records.Data = [.. imports];

        return new(GetColumn(), records);
    }

    public IEnumerable<string> GetColumn() => _columns;

    private Pagination<Customer> Query(
        Data data,
        QueryOptions queryOptions
    )
    {
        IQueryable<Customer> customers = _customerRepository
            .Raw()
            .Where(Condition(data));

        return new(customers, queryOptions);
    }

    private static string Condition(Data data)
    {
        string condition = string.Empty;
        foreach (Filter filter in data.Filters)
            condition +=
                $@"{Format.UpperFirstLetter(filter.Column)} {GetOperator(filter.Operator)} ""{filter.Value}"" && ";

        //
        //  Summary:
        //      Get record mapping profile
        //
        //  Returns:
        //
        return condition
            + $@"{nameof(Customer.ProfileId)} == Guid(""{data.ProfileId}"")";
    }

    private static string GetOperator(Condition condition)
    {
        string[] @case = ["==", "!=", ">", "<"];
        return @case[(int)condition];
    }
}
