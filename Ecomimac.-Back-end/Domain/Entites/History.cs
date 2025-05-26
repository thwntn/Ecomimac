namespace ReferenceDatabase;

public class History(
    string contact,
    ChannelBroadcast mode,
    string jsonData,
    HistoryStatus status,
    Guid broadcastId,
    Guid profileId,
    Guid sendingId,
    int times
) : Entity, IEntity
{
    [Required]
    public string Contact { get; set; } = contact;

    [Required]
    public ChannelBroadcast Mode { get; set; } = mode;

    [Required]
    public string JsonData { get; set; } = jsonData;

    [Required]
    public HistoryStatus Status { get; set; } = status;

    [Required]
    public int Times { get; set; } = times;

    [Required]
    public Guid SendingId { get; set; } = sendingId;

    [Required]
    public Guid BroadcastId { get; set; } = broadcastId;

    [ForeignKey(nameof(BroadcastId))]
    public Broadcast Broadcast { get; set; }

    [Required]
    public Guid ProfileId { get; set; } = profileId;

    [ForeignKey(nameof(ProfileId))]
    public Profile Profile { get; set; }
}
