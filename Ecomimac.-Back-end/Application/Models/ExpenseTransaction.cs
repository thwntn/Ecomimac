namespace ReferenceModel;

public class ExpenseTransactionObject
{
    public class Counter(
        IEnumerable<ExpenseTransaction> items,
        long totalCost,
        ExpenseTransactionCounterNames ExpenseTransactionCounterNames
    )
    {
        public IEnumerable<ExpenseTransaction> Items { get; set; } = items;
        public long TotalCost { get; set; } = totalCost;
        public ExpenseTransactionCounterNames ExpenseTransactionCounterNames { get; set; } =
            ExpenseTransactionCounterNames;
    }

    public class Statistic(string name, long value)
    {
        public string Name { get; set; } = name;
        public long Value { get; set; } = value;
    }
}
