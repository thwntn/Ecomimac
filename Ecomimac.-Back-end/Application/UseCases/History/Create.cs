namespace ReferenceService;

public class CreateHistory(IBroadcastRepository broadcastRepository)
    : ICreateHistory
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private static readonly string _historyConnect =
        Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.HistoryConnect)
        );
    private static readonly string _historyDirectory = Format.ConcatPathName(
        Environment.GetEnvironmentVariable(nameof(EnvironmentNames.Media)),
        Environment.GetEnvironmentVariable(
            nameof(EnvironmentNames.HistoryDirectory)
        )
    );

    public async Task<IEnumerable<History>> Execute(
        Guid broadcastId,
        IEnumerable<History> histories
    )
    {
        await CreateFile(broadcastId, histories);

        //  Summary:
        //      Count number success & failed
        //
        int numberFailed = 0,
            numberSuccess = 0;

        foreach (History history in histories)
            if (history.Status is HistoryStatus.SUCCESS)
                numberSuccess++;
            else
                numberFailed++;

        //  Summary:
        //      Update number failed & success summary
        //
        _broadcastRepository
            .GetByCondition(broadcast => broadcast.Id == broadcastId)
            .ExecuteUpdate(setters =>
                setters
                    .SetProperty(
                        broadcast => broadcast.NumberFailed,
                        broadcast => broadcast.NumberFailed + numberFailed
                    )
                    .SetProperty(
                        broadcast => broadcast.NumberSuccess,
                        broadcast => broadcast.NumberSuccess + numberSuccess
                    )
            );
        return histories;
    }

    private async Task CreateFile(
        Guid broadcastId,
        IEnumerable<History> histories
    )
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);

        //  Summary:
        //      Create file history file information
        //
        string fileName = broadcast.Times + ".txt";
        string directory = Format.ConcatPathName(
            Directory.GetCurrentDirectory(),
            _historyDirectory,
            string.Concat(broadcast.Id)
        );

        //  Summary:
        //      Create file if not exist
        //
        Directory.CreateDirectory(directory);

        //  Summary:
        //      Write file
        //
        IEnumerable<string> records = histories.Select(history =>
            Format.ToSimpleText(
                string.Join(
                    _historyConnect,
                    [
                        history.Contact,
                        history.SendingId,
                        broadcast.Name,
                        broadcast.Description,
                        history.Created,
                        history.Times,
                        (int)history.Status,
                    ]
                )
            )
        );

        string filePath = Format.ConcatPathName(directory, fileName);
        if (File.Exists(filePath) is false)
            await File.WriteAllLinesAsync(filePath, records);
        else
            await File.AppendAllLinesAsync(filePath, records);
    }
}
