namespace ReferenceService;

public class CreateBroadcastOpenIntegrateSession(
    IOpenIntegrateSessionRepository openIntegrateSessionRepository
) : ICreateBroadcastOpenIntegrateSession
{
    private readonly IOpenIntegrateSessionRepository _openIntegrateSessionRepository =
        openIntegrateSessionRepository;

    public OpenIntegrateSession Execute(Guid profileId, Guid broadcastId)
    {
        string session = Cryptography.RandomCode();
        OpenIntegrateSession openIntegrateSession = new(
            session,
            profileId,
            OpenIntegrationType.BROADCAST
        )
        {
            BroadcastId = broadcastId,
        };

        _openIntegrateSessionRepository.Create(openIntegrateSession);
        return openIntegrateSession;
    }
}
