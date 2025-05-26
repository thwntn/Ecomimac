namespace ReferenceModel;

public class StatusInvoiceObject
{
    public class InitConfig(
        string name,
        string color,
        string backgroundColor,
        string icon
    )
    {
        public string Name { get; set; } = name;
        public string Color { get; set; } = color;
        public string BackgroundColor { get; set; } = backgroundColor;
        public string Icon { get; set; } = icon;
    }

    public class Status(InvoiceStatus key)
    {
        public InvoiceStatus Key { get; set; } = key;
        public string BackgroundColor { get; set; }
        public string Description { get; set; }
        public long Quantity { get; set; }
        public long TotalCost { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
    }
}
