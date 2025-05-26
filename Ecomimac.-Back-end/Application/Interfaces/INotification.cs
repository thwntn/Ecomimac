namespace ReferenceService;

public interface INotification
{
    IEnumerable<Notification> List();
    Notification Add(
        Guid to,
        Guid from,
        NotificationNames type,
        object jsonData
    );
    Notification Read(Guid notificationId);
    Notification Handle(Guid notificationId);
}
