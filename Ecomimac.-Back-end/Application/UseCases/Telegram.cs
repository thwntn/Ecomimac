namespace ReferenceService;

public class TelegramService(ISetting settingService, IRequest requestService)
    : ITelegram
{
    private readonly ISetting _settingService = settingService;
    private readonly IRequest _requestService = requestService;

    public TelegramDataTransformer.Setup Setup(
        TelegramDataTransformer.Setup setup
    )
    {
        _settingService.UpSert(
            new()
            {
                Name = nameof(SettingNames.TELEGRAM_TOKEN),
                Value = setup.TelegramToken,
            }
        );

        _settingService.UpSert(
            new()
            {
                Name = nameof(SettingNames.TELEGRAM_CHAT_ID),
                Value = setup.ChatId,
            }
        );
        return setup;
    }

    public async Task<TelegramDataTransformer.SendMessage> SendMessage(
        string message
    )
    {
        Dictionary<string, string> setting = _settingService.Get(
            [
                nameof(SettingNames.TELEGRAM_TOKEN),
                nameof(SettingNames.TELEGRAM_CHAT_ID),
            ]
        );

        setting.TryGetValue(
            nameof(SettingNames.TELEGRAM_TOKEN),
            out string tokenBot
        );
        setting.TryGetValue(
            nameof(SettingNames.TELEGRAM_CHAT_ID),
            out string chatId
        );
        if (tokenBot == default || chatId == default)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_TELEGRAM_SETUP
            );

        string url = Environment
            .GetEnvironmentVariable(nameof(EnvironmentNames.TelegramBotUri))
            .Replace("__TELEGRAM_TOKEN__", tokenBot);
        // string message = MessageConstant
        //     .MESSAGE_RECEIVED_TRANSACTION_SUCCESS.Replace(
        //         "__INVOICE_CODE__",
        //         code
        //     )
        //     .Replace("__AMOUNT__", Format.CurrencyDefault(long.Parse(amount)));

        string html;
        await _requestService.Json<object>(
            url,
            Mapper.Map<Dictionary<string, object>>(
                new
                {
                    chat_id = chatId,
                    text = message,
                    parse_mode = nameof(html),
                }
            ),
            default
        );
        return default;
    }
}
