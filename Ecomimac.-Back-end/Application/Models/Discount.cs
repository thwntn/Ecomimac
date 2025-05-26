namespace ReferenceModel;

public class DiscountObject
{
    public class Counter : Discount
    {
        public int Applied { get; set; }

        public int Compare { get; set; }
    }

    public class Chart(string date, long amount)
    {
        public string Date { get; set; } = date;
        public long Amount { get; set; } = amount;
    }
}
