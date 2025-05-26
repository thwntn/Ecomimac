namespace ReferenceService;

public class DashboardService(DatabaseContext databaseContext) : IDashboard
{
    private readonly DatabaseContext _databaseContext = databaseContext;

    public Dashboard.ExpenditureResponse Expenditure(Guid profileId)
    {
        return new(ExpenseTransaction(profileId), Fund(profileId));
    }

    private Dashboard.Expenditure<ExpenseTransaction> ExpenseTransaction(
        Guid profileId
    )
    {
        Dashboard.Expenditure<ExpenseTransaction> expenseCategoryTransaction =
            new();
        int thisMonth = Timebase.Now().Month;
        int lastMonth = Timebase.Now().AddMonths(-1).Month;

        IEnumerable<ExpenseTransaction> expenseCategoryTransactions =
            _databaseContext
                .Expense.Include(expense => expense.ExpenseTransactions)
                .Where(expenseCategoryTransaction =>
                    expenseCategoryTransaction.ProfileId == profileId
                )
                .SelectMany(fund => fund.ExpenseTransactions);

        IEnumerable<ExpenseTransaction> expenseCategoryTransactionsInMonth =
            expenseCategoryTransactions.Where(expenseCategoryTransaction =>
                expenseCategoryTransaction.Created.Month == thisMonth
            );
        IEnumerable<ExpenseTransaction> expenseCategoryTransactionsLastMonth =
            expenseCategoryTransactions.Where(expenseCategoryTransaction =>
                expenseCategoryTransaction.Created.Month == lastMonth
            );

        long totalCost = expenseCategoryTransactions.Sum(
            expenseCategoryTransaction =>
                long.Parse(expenseCategoryTransaction.Amount)
        );
        long month = expenseCategoryTransactionsInMonth.Sum(
            expenseCategoryTransaction =>
                long.Parse(expenseCategoryTransaction.Amount)
        );

        expenseCategoryTransaction.counter = new(
            totalCost,
            expenseCategoryTransactions.Count(),
            month
        );
        expenseCategoryTransaction.chart.thisMonth = SumExpenseTransactionChart(
            expenseCategoryTransactionsInMonth
        );
        expenseCategoryTransaction.chart.lastMonth = SumExpenseTransactionChart(
            expenseCategoryTransactionsLastMonth
        );
        expenseCategoryTransaction.recent = expenseCategoryTransactions
            .OrderByDescending(expenseCategoryTransaction =>
                expenseCategoryTransaction.Created
            )
            .Take(15);

        return expenseCategoryTransaction;
    }

    private static List<Dashboard.Value> SumExpenseTransactionChart(
        IEnumerable<ExpenseTransaction> expenseCategoryTransactions
    )
    {
        List<Dashboard.Value> values = expenseCategoryTransactions
            .OrderByDescending(expenseCategoryTransaction =>
                expenseCategoryTransaction.DateTime
            )
            .GroupBy(expenseCategoryTransaction =>
                expenseCategoryTransaction.DateTime.Date
            )
            .Select(expenseCategoryTransactionGroup => new Dashboard.Value(
                expenseCategoryTransactionGroup.Key.ToString(),
                expenseCategoryTransactionGroup.Key,
                expenseCategoryTransactionGroup.Sum(
                    expenseCategoryTransaction =>
                        long.Parse(expenseCategoryTransaction.Amount)
                )
            ))
            .Take(10)
            .ToList();

        double maxValue =
            values.Count > 0 ? values.Max(value => value.quantity) : 0;
        values.ForEach(value =>
            value.quantity = Math.Round(value.quantity / maxValue * 100)
        );
        values.Reverse();
        return values;
    }

    private Dashboard.Expenditure<CashDescription> Fund(Guid profileId)
    {
        Dashboard.Expenditure<CashDescription> cash = new();
        int thisMonth = Timebase.Now().Month;
        int lastMonth = Timebase.Now().AddMonths(-1).Month;

        IEnumerable<CashDescription> cashDescriptions = _databaseContext
            .Fund.Include(fund => fund.Cashes)
            .ThenInclude(cash => cash.CashDescriptions)
            .Where(fund => fund.ProfileId == profileId)
            .SelectMany(fund => fund.Cashes)
            .SelectMany(cash => cash.CashDescriptions);

        IEnumerable<CashDescription> cashDescriptionInMonth =
            cashDescriptions.Where(cashDescription =>
                cashDescription.Created.Month == thisMonth
            );
        IEnumerable<CashDescription> cashDescriptionLastMonth =
            cashDescriptions.Where(cashDescription =>
                cashDescription.Created.Month == lastMonth
            );

        long totalCost = cashDescriptions.Sum(cashDescription =>
            long.Parse(cashDescription.Quantity)
        );
        long month = cashDescriptionInMonth.Sum(cashDescription =>
            long.Parse(cashDescription.Quantity)
        );

        cash.counter = new(totalCost, cashDescriptions.Count(), month);
        cash.chart.thisMonth = SumFundChart(cashDescriptionInMonth);
        cash.chart.lastMonth = SumFundChart(cashDescriptionLastMonth);
        cash.recent = cashDescriptions
            .OrderByDescending(cashDescription => cashDescription.Created)
            .Take(15);
        return cash;
    }

    private static List<Dashboard.Value> SumFundChart(
        IEnumerable<CashDescription> cashDescriptions
    )
    {
        List<Dashboard.Value> values = cashDescriptions
            .GroupBy(cashDescription => cashDescription.Created)
            .Select(cashDescriptionGroup => new Dashboard.Value(
                cashDescriptionGroup.Key.ToString(),
                cashDescriptionGroup.Key,
                cashDescriptionGroup.Sum(cashDescription =>
                    long.Parse(cashDescription.Quantity)
                )
            ))
            .Take(10)
            .ToList();

        // double maxValue = values.Max(value => value.quantity);
        // values.ForEach(value => Math.Round(value.quantity = value.quantity / maxValue * 100));
        return values;
    }
}
