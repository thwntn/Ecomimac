namespace ReferenceService;

public class SyncFromCacheHistory(
    ICache cacheService,
    IHistoryRepository historyRepository
) : ISyncFromCacheHistory
{
    private readonly ICache _cacheService = cacheService;
    private readonly IHistoryRepository _historyRepository = historyRepository;

    public bool Execute()
    {
        List<Guid> guids = Format.Default(
            _cacheService.Get<List<Guid>>(
                nameof(CacheNames.MessageQueueBroadcastMailgun)
            ),
            []
        );

        IEnumerable<History> histories = _historyRepository.GetByCondition(
            history => guids.Contains(history.SendingId)
        );

        foreach (History history in histories)
            history.Status = HistoryStatus.SUCCESS;

        Logger.Json(histories);
        _historyRepository.Update(histories);
        return true;
    }
}
