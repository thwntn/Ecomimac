namespace ReferenceModel;

public class SaleProgramObject
{
    public class ChildrenElementObject(
        IEnumerable<Promotion> promotions,
        IEnumerable<Product> products,
        IEnumerable<Discount> discounts
    )
    {
        public IEnumerable<Promotion> Promotions { get; set; } = promotions;
        public IEnumerable<Product> Products { get; set; } = products;
        public IEnumerable<Discount> Discounts { get; set; } = discounts;
    }

    public class Counter(long totalCost, int quantity, int quantityProduct)
    {
        public long TotalCost { get; set; } = totalCost;
        public int Quantity { get; set; } = quantity;
        public int QuantityProduct { get; set; } = quantityProduct;
    }

    public class Revenue(long totalCost, IEnumerable<SumRevenue> sumRevenues)
    {
        public long TotalCost { get; set; } = totalCost;
        public IEnumerable<SumRevenue> SumRevenues { get; set; } = sumRevenues;
    }

    public class SumRevenue(Product product, long total, double percent)
    {
        public double Percent { get; set; } = percent;
        public long Total { get; set; } = total;
        public Product Product { get; set; } = product;
    }

    public class Status(SaleProgramStatus key)
    {
        public SaleProgramStatus Key { get; set; } = key;
        public string BackgroundColor { get; set; }
        public string Description { get; set; }
        public long Quantity { get; set; }
        public long TotalCost { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
    }

    public class Report(DateTime dateTime, long amount)
    {
        public DateTime DateTime { get; set; } = dateTime;
        public long Amount { get; set; } = amount;
    }
}
