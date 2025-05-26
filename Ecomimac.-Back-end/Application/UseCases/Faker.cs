namespace ReferenceService;

public class FakerService(DatabaseContext databaseContext) : IFaker
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly int MAX_FAKE_QUANTITY = 10;

    public string Expense(Guid profileId)
    {
        List<Expense> expense = [];

        for (int index = 0; index < MAX_FAKE_QUANTITY; index++)
            expense.Add(
                new(Faker.Name.Suffix(), Faker.Address.Country())
                {
                    Created = Timebase.Now(),
                    ProfileId = profileId,
                }
            );

        _databaseContext.AddRange(expense);
        _databaseContext.SaveChanges();
        return string.Empty;
    }

    public string Customer(Guid profileId)
    {
        List<Customer> customers = [];

        for (int index = 0; index < MAX_FAKE_QUANTITY; index++)
            customers.Add(
                new(Faker.Name.Suffix(), Faker.Phone.Number(), profileId)
            );

        _databaseContext.AddRange(customers);
        _databaseContext.SaveChanges();
        return string.Empty;
    }

    public string Product(Guid profileId)
    {
        List<Product> products = [];

        for (int index = 0; index < MAX_FAKE_QUANTITY; index++)
            products.Add(
                new()
                {
                    Name = Faker.Name.Suffix(),
                    Description = Faker.Lorem.Paragraph(),
                    Created = Timebase.Now(),
                    Price = long.Parse(Faker.RandomNumber.Next().ToString()),
                    SalePercent = 0,
                    ProfileId = profileId,
                    HtmlDetail = string.Empty,
                }
            );

        _databaseContext.AddRange(products);
        _databaseContext.SaveChanges();
        return string.Empty;
    }

    public string Discount(Guid profileId)
    {
        List<Discount> discounts = [];

        for (int index = 0; index < MAX_FAKE_QUANTITY; index++)
            discounts.Add(
                new()
                {
                    Name = Faker.Name.Suffix(),
                    Created = Timebase.Now(),
                    Amount = Faker.RandomNumber.Next(),
                    Percent = 0,
                    ProfileId = profileId,
                }
            );

        _databaseContext.AddRange(discounts);
        _databaseContext.SaveChanges();
        return string.Empty;
    }

    public string ExpenseTransaction(Guid categoryId)
    {
        List<ExpenseTransaction> expenseCategoryTransactions = [];

        for (int index = 0; index < MAX_FAKE_QUANTITY; index++)
            expenseCategoryTransactions.Add(
                new()
                {
                    Name = Faker.Name.Suffix(),
                    Created = Timebase.Now(),
                    Amount = Faker.RandomNumber.Next().ToString(),
                    DateTime = Timebase.Now(),
                    ExpenseId = categoryId,
                }
            );

        _databaseContext.AddRange(expenseCategoryTransactions);
        _databaseContext.SaveChanges();
        return string.Empty;
    }
}
