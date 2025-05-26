namespace ReferenceService;

public class UpdateReferenceBroadcast(
    IBroadcastRepository broadcastRepository,
    IDataRepository dataRepository,
    IContentRepository contentRepository,
    IRealtimeBroadcast realtimeBroadcast
) : IUpdateReferenceBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;
    private readonly IContentRepository _contentRepository = contentRepository;
    private readonly IDataRepository _dataRepository = dataRepository;

    public Broadcast Execute(
        Guid profileId,
        Guid broadcastId,
        BroadcastDataTransformerObject.UpdateReferenceData updateReferenceData
    )
    {
        Broadcast broadcast = GetBroadcast(profileId, broadcastId);
        //  Summary:
        //      Renew map field if Update data source
        broadcast.Map = Mapper.Serialize(updateReferenceData.Maps);

        //  Summary:
        //      Merge broadcast & update object
        broadcast = Mapper.Merge(broadcast, updateReferenceData);

        _broadcastRepository.Update(broadcast);
        _realtimeBroadcast.Information(profileId);

        return broadcast;
    }

    private Broadcast GetBroadcast(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast =
            _broadcastRepository
                .Include(broadcast => broadcast.Content)
                .FirstOrDefault(broadcast =>
                    broadcast.Id == broadcastId
                    && broadcast.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );

        return broadcast;
    }

    public Broadcast UpdateData(
        Guid profileId,
        Guid broadcastId,
        BroadcastDataTransformerObject.UpdateData updateData
    )
    {
        Broadcast broadcast = GetBroadcast(profileId, broadcastId);
        //  Summary:
        //      Reset contact key
        broadcast.DataId = updateData.DataId;
        broadcast.SendKey = default;

        Data data =
            _dataRepository
                .GetByCondition(broadcast =>
                    broadcast.Id == updateData.DataId
                    && broadcast.ProfileId == profileId
                )
                .FirstOrDefault()
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DATA
            );

        //  Summary:
        //      Setup map content
        broadcast.Map = Mapper.Serialize(
            broadcast.Content.ParseMap.Select(
                map => new BroadcastObject.KeyAndField(default, map)
            )
        );

        _broadcastRepository.Update(broadcast);
        _realtimeBroadcast.Information(profileId);

        return broadcast;
    }

    public Broadcast UpdateContent(
        Guid profileId,
        Guid broadcastId,
        BroadcastDataTransformerObject.UpdateContent updateContent
    )
    {
        Broadcast broadcast = GetBroadcast(profileId, broadcastId);
        Content content =
            _contentRepository
                .Raw()
                .FirstOrDefault(content =>
                    content.Id == updateContent.ContentId
                    && content.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DATA
            );

        //  Summary:
        //      Setup map content
        broadcast.Map = Mapper.Serialize(
            content.ParseMap.Select(map => new BroadcastObject.KeyAndField(
                default,
                map
            ))
        );

        //  Summary:
        //      Change content
        broadcast.ContentId = updateContent.ContentId;
        broadcast.Content = default;

        _broadcastRepository.Update(broadcast);
        _realtimeBroadcast.Information(profileId);

        return broadcast;
    }
}
