namespace ReferenceService;

public class BroadcastService(
    IBroadcastRepository sendRepository,
    IZaloCredentialRepository zaloCredentialRepository,
    IMailCredentialRepository mailCredentialRepository,
    IContentRepository contentRepository,
    IRealtimeBroadcast realtimeBroadcast
) : IBroadcast
{
    private readonly IBroadcastRepository _broadcastRepository = sendRepository;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;
    private readonly IZaloCredentialRepository _zaloCredentialRepository =
        zaloCredentialRepository;
    private readonly IMailCredentialRepository _mailCredentialRepository =
        mailCredentialRepository;
    private readonly IContentRepository _contentRepository = contentRepository;

    public Pagination<Broadcast> List(Guid profileId, QueryOptions queryOptions)
    {
        IEnumerable<Broadcast> broadcasts = _broadcastRepository
            .Include(broadcast => broadcast.Content)
            .Include(broadcast => broadcast.MailCredential)
            .Include(broadcast => broadcast.Data)
            .Include(broadcast => broadcast.ZaloCredential)
            .Where(broadcast =>
                broadcast.ProfileId == profileId && broadcast.Deleted == null
            )
            .OrderByDescending(broadcast => broadcast.Created);

        return new(broadcasts.AsQueryable(), queryOptions);
    }

    public Broadcast Create(
        Guid profileId,
        BroadcastDataTransformerObject.Create create
    )
    {
        Broadcast broadcast = Mapper.Map<Broadcast>(create);
        broadcast.ProfileId = profileId;

        Content content = _contentRepository.GetById(create.ContentId);
        if (content.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CONTENT
            );

        broadcast.ContentId = content.Id;

        broadcast.ZaloCredentialId =
            create.Channel == ChannelBroadcast.ZALO
                ? _zaloCredentialRepository.GetById(create.CredentialId).Id
                : null;

        broadcast.MailCredentialId =
            create.Channel == ChannelBroadcast.EMAIl
                ? _mailCredentialRepository.GetById(create.CredentialId).Id
                : null;

        //  Summary:
        //      Setup map content
        //
        broadcast.Map = Mapper.Serialize(
            content.ParseMap.Select(map => new BroadcastObject.KeyAndField(
                default,
                map
            ))
        );

        _broadcastRepository.Create(broadcast);
        _realtimeBroadcast.Execute(profileId);
        return broadcast;
    }

    public Broadcast Information(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast =
            _broadcastRepository
                .Include(broadcast => broadcast.Content)
                .Include(broadcast => broadcast.Data)
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

    // public Broadcast UpdateContent(
    //     Guid profileId,
    //     Guid broadcastId,
    //     BroadcastDataTransformerObject.UpdateContent updateContent
    // )
    // {
    //     Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
    //     if (broadcast.ProfileId.CompareTo(profileId) is not 0)
    //         throw new HttpException(
    //             HttpStatus.BadRequest,
    //             MessageConstant.NOT_FOUND_BROADCAST
    //         );

    //     Broadcast merge = Mapper.Merge(broadcast, updateContent);
    //     _broadcastRepository.Update(merge);
    //     return merge;
    // }

    public string Remove(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = Information(profileId, broadcastId);
        _broadcastRepository.SoftRemove(broadcast, profileId);
        return string.Empty;
    }
}
