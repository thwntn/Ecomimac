namespace ReferenceDataTransformer;

public class StatusInvoiceDataTransformer
{
    public class Create
    {
        [JsonRequired]
        public string Title { get; set; }

        [JsonRequired]
        public string Key { get; set; }

        [JsonRequired]
        public string Color { get; set; }

        [JsonRequired]
        public string Icon { get; set; }

        [JsonRequired]
        public string BackgroundColor { get; set; }
    }
};
