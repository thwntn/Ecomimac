namespace ReferenceDataTransformer;

public class TelegramDataTransformer
{
    public class Setup
    {
        [Required]
        public string TelegramToken { get; set; }

        [Required]
        public string ChatId { get; set; }
    }

    public class SendMessage
    {
        [Required]
        public string Message { get; set; }
    }
}
