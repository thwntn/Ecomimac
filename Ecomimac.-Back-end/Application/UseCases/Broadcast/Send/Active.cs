namespace ReferenceService;

public class ActiveBroadcast(
    ICustomerRepository customerRepository,
    IBroadcastRepository broadcastRepository,
    IRealtimeBroadcast realtimeBroadcast,
    IHandleActiveBroadcast handleActiveBroadcast,
    IMailSendingBroadcast mailSendingBroadcast
) : IActiveBroadcast
{
    private readonly IHandleActiveBroadcast _handleActiveBroadcast =
        handleActiveBroadcast;
    private readonly IMailSendingBroadcast _mailSendingBroadcast =
        mailSendingBroadcast;
    private readonly IRealtimeBroadcast _realtimeBroadcast = realtimeBroadcast;
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly ICustomerRepository _customerRepository =
        customerRepository;

    public async Task<string> Execute(Guid profileId, Guid broadcastId)
    {
        Broadcast broadcast = _handleActiveBroadcast.Information(
            profileId,
            broadcastId
        );
        //  Summary:
        //      Validated can active broadcast
        CanActive(broadcast);

        SetProcess(profileId, broadcastId, BroadcastProcess.SENDING, 1);
        IEnumerable<Customer> customers = _customerRepository.GetByCondition(
            customer => customer.ProfileId == profileId
        );

        //  Summary:
        //      When running queue & process will update summary broadcast
        switch (broadcast.Channel)
        {
            case ChannelBroadcast.EMAIl:
            {
                if (broadcast.MailCredentialId.Justifiable())
                    await _mailSendingBroadcast.MailGun(profileId, broadcast);
                break;
            }
        }

        SetProcess(profileId, broadcastId, BroadcastProcess.DONE);
        return string.Empty;
    }

    private static bool CanActive(Broadcast broadcast)
    {
        //  Summary:
        //      If broadcast is running -> error message
        if (broadcast.Process is BroadcastProcess.SENDING)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.BROADCAST_IS_RUNNING
            );

        //  Summary:
        //      If not found send key -> error message
        if (broadcast.SendKey.Justifiable() is false)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_SEND_KEY
            );

        //  Summary:
        //      If not mapping field not setup -> error message
        if (broadcast.ParseMap.All(map => map.Field.Justifiable()) is false)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.BROADCAST_MAPPING_FIELD_FAILED
            );

        return true;
    }

    private void SetProcess(
        Guid profileId,
        Guid broadcastId,
        BroadcastProcess broadcastProcess,
        int increase = 0
    )
    {
        //  Summary:
        //      Update status running broadcast
        _broadcastRepository
            .GetByCondition(broadcast => broadcast.Id == broadcastId)
            .ExecuteUpdate(setters =>
                setters
                    .SetProperty(
                        broadcast => broadcast.Times,
                        broadcast => broadcast.Times + increase
                    )
                    .SetProperty(
                        broadcast => broadcast.Process,
                        _ => broadcastProcess
                    )
            );
        _realtimeBroadcast.Execute(profileId);
    }
}
