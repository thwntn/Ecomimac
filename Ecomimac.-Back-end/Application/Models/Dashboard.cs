namespace ReferenceModel;

public class Dashboard
{
    public class ExpenditureResponse(
        Expenditure<ExpenseTransaction> expenseCategoryTransaction,
        Expenditure<CashDescription> cash
    )
    {
        public Expenditure<ExpenseTransaction> expenseCategoryTransaction =
            expenseCategoryTransaction;
        public Expenditure<CashDescription> cash = cash;
    }

    public class Expenditure<T>
    {
        public Counter counter = new(0, 0, 0);
        public Count<T> chart = new();
        public IEnumerable<T> recent = [];
    }

    public class Counter(long totalCost, long totalItem, long thisMonth)
    {
        public long totalItem = totalItem;
        public long totalCost = totalCost;
        public long thisMonth = thisMonth;
    }

    public class Count<T>
    {
        public IEnumerable<Value> thisMonth;
        public IEnumerable<Value> lastMonth;
    }

    public class Value(string name, DateTime dateTime, double quantity)
    {
        public string name = name;
        public DateTime dateTime = dateTime;
        public double quantity = quantity;
    }
}
