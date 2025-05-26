namespace ReferenceService;

public class SwitchToSending(
    IHistoryRepository historyRepository,
    ICache cacheService
) : ISwitchToSending
{
    private readonly IHistoryRepository _historyRepository = historyRepository;
    private readonly ICache _cacheService = cacheService;

    public void Execute(Guid sendingId)
    {
        string nameOfCache = nameof(CacheNames.MessageQueueBroadcastMailgun);
        List<Guid> guids = Format.Default(
            _cacheService.Get<List<Guid>>(
                nameof(CacheNames.MessageQueueBroadcastMailgun)
            ),
            []
        );

        guids.Add(sendingId);

        Logger.Json(guids);
        _cacheService.Update(nameOfCache, guids);
    }
}
