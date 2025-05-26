namespace ReferenceModel;

public class ExpenseCategoryObject
{
    public class Counter(long totalCost, int quantity, int quantityTransaction)
    {
        public long TotalCost { get; set; } = totalCost;
        public int Quantity { get; set; } = quantity;
        public int QuantityTransaction { get; set; } = quantityTransaction;
    }
}
