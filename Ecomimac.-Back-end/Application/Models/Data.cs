namespace ReferenceModel;

public class DataObject
{
    public class Import(IEnumerable<string> schema, IEnumerable<object> data)
    {
        public IEnumerable<string> Schema { get; set; } = schema;
        public IEnumerable<object> Data { get; set; } = data;
    }

    public class FromCustomer(
        IEnumerable<string> columns,
        Pagination<ReferenceDatabase.Import> recordAndCounter
    )
    {
        public IEnumerable<string> Columns = columns;
        public Pagination<ReferenceDatabase.Import> Pagination =
            recordAndCounter;
    }

    public class Counter(
        int quantityData,
        int quantityImport,
        IEnumerable<Data> data
    )
    {
        public int QuantityData { get; } = quantityData;
        public int QuantityImport { get; } = quantityImport;
        public IEnumerable<Data> Recent = data;
    }

    public class Count(Guid id, int quantity)
    {
        public Guid Id { get; } = id;
        public int Quantity { get; } = quantity;
    }

    public class Status
    {
        public int Enum { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string BackgroundColor { get; set; }
    }
}
