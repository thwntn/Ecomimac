namespace ReferenceService;

public class NotificationService(
    DatabaseContext databaseContext,
    IConnectionHub wsconnectionHubService,
    IJwt jwtService
) : INotification
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IConnectionHub _wsconnectionHubService = wsconnectionHubService;
    private readonly IJwt _jwtService = jwtService;

    public IEnumerable<Notification> List()
    {
        IEnumerable<Notification> notifications = _databaseContext
            .Notification.Include(notification => notification.Profile)
            .Where(notification =>
                notification.ProfileId == _jwtService.Information().ProfileId
            )
            .OrderBy(item => item.IsRead);

        IEnumerable<Notification> result = notifications.Join(
            _databaseContext.Profile,
            notification => notification.FromId,
            user => user.Id,
            (notification, user) =>
            {
                notification.From = user;
                return notification;
            }
        );

        return result;
    }

    public Notification Add(
        Guid toAccount,
        Guid fromAccount,
        NotificationNames type,
        object jsonData
    )
    {
        Notification notification =
            new()
            {
                JsonData = Mapper.Serialize(jsonData),
                Type = type,
                FromId = fromAccount,
                IsRead = false,
                Handle = false,
                ProfileId = _jwtService.Information().ProfileId,
            };

        _databaseContext.Add(notification);
        _databaseContext.SaveChanges();

        RealtimeUpdate(_jwtService.Information().ProfileId);
        return notification;
    }

    public Notification Read(Guid notificationId)
    {
        Notification notification =
            _databaseContext.Notification.FirstOrDefault(notification =>
                notification.Id == notificationId
                && notification.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTIFICATION
            );

        notification.IsRead = true;
        _databaseContext.Update(notification);
        _databaseContext.SaveChanges();

        RealtimeUpdate(_jwtService.Information().ProfileId);
        return notification;
    }

    public Notification Handle(Guid notificationId)
    {
        Notification notification =
            _databaseContext.Notification.FirstOrDefault(notification =>
                notification.Id == notificationId
                && notification.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTIFICATION
            );

        notification.Handle = true;
        notification.IsRead = true;

        _databaseContext.Notification.Update(notification);
        _databaseContext.SaveChanges();

        RealtimeUpdate(_jwtService.Information().ProfileId);
        return notification;
    }

    private void RealtimeUpdate(Guid profileId)
    {
        _wsconnectionHubService.Invoke(
            string.Concat(profileId),
            nameof(HubMethodName.UPDATE_NOTIFICATION),
            string.Empty
        );
    }
}
