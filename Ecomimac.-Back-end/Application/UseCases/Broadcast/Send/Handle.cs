namespace ReferenceService;

public class HandleActiveBroadcast(
    IBroadcastRepository broadcastRepository,
    IRecordData recordData
) : IHandleActiveBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IRecordData _recordData = recordData;

    public Broadcast Information(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast =
            _broadcastRepository
                .Include(broadcast => broadcast.MailCredential)
                .Include(broadcast => broadcast.Content)
                .FirstOrDefault(broadcast =>
                    broadcast.ProfileId == profileId
                    && broadcast.Id == broadcastId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );

        //  Summary:
        //      Remove loop serialize
        broadcast.MailCredential.Broadcasts = default;
        return broadcast;
    }

    public List<Dictionary<string, string>> ContactExtension(
        Guid profileId,
        Guid dataId,
        QueryOptions queryOptions
    )
    {
        Pagination<Import> recordData = _recordData.Execute(
            profileId,
            dataId,
            queryOptions
        );

        return Mapper.Map<List<Dictionary<string, string>>>(
            recordData.Data.Select(record => record.ParseRecord)
        );
    }

    public string MapContent(
        Broadcast broadcast,
        Dictionary<string, string> source
    )
    {
        IEnumerable<BroadcastObject.KeyAndField> keyAndFields =
            Mapper.Deserialize<List<BroadcastObject.KeyAndField>>(
                broadcast.Map
            );

        string mappedContent = broadcast.Content.Text;
        foreach (BroadcastObject.KeyAndField keyAndField in keyAndFields)
            try
            {
                source.TryGetValue(keyAndField.Key, out string output);
                mappedContent = mappedContent.Replace(
                    keyAndField.Field,
                    output
                );
            }
            catch
            {
                continue;
            }

        return mappedContent;
    }
}
