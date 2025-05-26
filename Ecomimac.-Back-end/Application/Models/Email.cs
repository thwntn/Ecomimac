namespace ReferenceModel;

public class EmailObject
{
    public class JsonData(string subject, string content)
    {
        public string Subject { get; set; } = subject;
        public string Content { get; set; } = content;
    }
}
