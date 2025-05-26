namespace ReferenceDatabase;

public class OpenIntegrateSession(
    string session,
    Guid profileId,
    OpenIntegrationType type
) : Entity, IEntity
{
    [JsonRequired]
    public string Session { get; set; } = session;

    [AllowNull]
    public DateTime? Expired { get; set; }

    [JsonRequired]
    [DefaultValue(OpenIntegrateStatus.OPEN)]
    public OpenIntegrateStatus Status { get; set; }

    [JsonRequired]
    public OpenIntegrationType Type { get; set; } = type;

    [AllowNull]
    public Guid? BroadcastId { get; set; }

    [ForeignKey(nameof(BroadcastId))]
    public Broadcast Broadcast { get; set; }

    [JsonRequired]
    public Guid ProfileId { get; set; } = profileId;

    [ForeignKey(nameof(ProfileId))]
    public Profile Profile { get; set; }
}
