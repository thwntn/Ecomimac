namespace ReferenceService;

public class ActiveOpenIntegrationSession(
    IOpenIntegrateSessionRepository openIntegrateSessionRepository,
    IBroadcastRepository broadcastRepository,
    IActiveBroadcast activeBroadcast
) : IActiveOpenIntegrationSession
{
    private readonly IOpenIntegrateSessionRepository _openIntegrateSessionRepository =
        openIntegrateSessionRepository;
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IActiveBroadcast _activeBroadcast = activeBroadcast;

    public async Task<OpenIntegrateSession> Execute(string session)
    {
        OpenIntegrateSession openIntegrateSession =
            _openIntegrateSessionRepository
                .Include(openIntegrateSession => openIntegrateSession.Broadcast)
                .FirstOrDefault(openIntegrateSession =>
                    openIntegrateSession.Session == session
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_OPEN_INTEGRATE_SESSION
            );

        //  Summary:
        //      Find session define case
        //
        switch (openIntegrateSession.Type)
        {
            //  Summary:
            //      Active broadcast
            //
            case OpenIntegrationType.BROADCAST:
            {
                if (openIntegrateSession.BroadcastId.Justifiable() is false)
                    break;

                await ActiveBroadcast(
                    openIntegrateSession.ProfileId,
                    Mapper.Map<Guid>(openIntegrateSession.BroadcastId)
                );
                break;
            }
        }

        return openIntegrateSession;
    }

    public async Task<string> ActiveBroadcast(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = _broadcastRepository.GetById(broadcastId);
        if (broadcast.Deleted.Justifiable() is true)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_BROADCAST
            );
        //  Summary:
        //      Active broadcast
        string message = await _activeBroadcast.Execute(profileId, broadcastId);
        return message;
    }
}
