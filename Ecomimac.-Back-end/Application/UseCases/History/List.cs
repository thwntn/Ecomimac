namespace ReferenceService;

public class ListHistory(IBroadcastRepository broadcastRepository)
    : IListHistory
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

    public async Task<Pagination<HistoryObject.Response>> Execute(
        Guid profileId,
        Guid broadcastId,
        QueryOptions queryOptions
    )
    {
        //
        //  Summary:
        //      Get information broadcast
        //
        //  Returns:
        //
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);

        if (broadcast.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );

        //
        //  Summary:
        //      Read file & convert to format response
        //
        //  Returns:
        //
        int fromLine = (queryOptions.Page - 1) * queryOptions.Limit;
        int loop = queryOptions.Limit;

        string file = Format.ConcatPathName(
            Directory.GetCurrentDirectory(),
            _historyDirectory,
            string.Concat(broadcast.Id),
            $"{broadcast.Times}.txt"
        );

        ReaderObject.ReadLine read = await Reader.ReadLine(
            file,
            fromLine,
            loop
        );

        string[] names =
        [
            nameof(History.Contact),
            nameof(History.SendingId),
            nameof(Broadcast.Name),
            nameof(Broadcast.Description),
            nameof(History.Created),
            nameof(History.Times),
            nameof(History.Status),
        ];

        //
        //  Summary:
        //      Mapping text line to response structure
        //
        //  Returns:
        //
        IEnumerable<Dictionary<string, string>> mapped = read.Lines.Select(
            (history) =>
                history
                    .Split(_historyConnect)
                    .Select(
                        (value, index) =>
                            new HistoryObject.Parse(names[index], value)
                    )
                    .ToDictionary(key => key.Key, value => value.Value)
        );

        return new(default, default)
        {
            Data = Mapper.Map<List<HistoryObject.Response>>(mapped),
            Page = new(read.Count, queryOptions.Limit, queryOptions.Page),
        };
    }
}
