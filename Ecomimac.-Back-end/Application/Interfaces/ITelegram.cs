namespace ReferenceService;

public interface ITelegram
{
    TelegramDataTransformer.Setup Setup(TelegramDataTransformer.Setup setup);
    Task<TelegramDataTransformer.SendMessage> SendMessage(string message);
}
