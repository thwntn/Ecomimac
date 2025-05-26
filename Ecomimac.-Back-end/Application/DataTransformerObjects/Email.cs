namespace ReferenceDataTransformer;

public class EmailDataTransformerObject
{
    public class Send(string to, string html, string subject)
    {
        [JsonRequired]
        public string To { get; set; } = to;

        [JsonRequired]
        public string Html { get; set; } = html;

        [JsonRequired]
        public string Subject { get; set; } = subject;
    }
}
