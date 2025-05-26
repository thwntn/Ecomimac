namespace ReferenceInterface;

public class ImportObject
{
    public class QueryResponse<TResult>(int total, IEnumerable<TResult> records)
    {
        public int Total { get; set; } = total;
        public IEnumerable<TResult> Records { get; set; } = records;
    }

    public class Preview(List<string> schema, List<object> data)
    {
        public List<string> Schema { get; set; } = schema;
        public List<object> Data { get; set; } = data;
    }
}
