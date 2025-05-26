namespace ReferenceDatabase;

public class Broadcast : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [AllowNull]
    public string? Description { get; set; }

    [Required]
    public ChannelBroadcast Channel { get; set; }

    [Required]
    [DefaultValue(0)]
    public int Times { get; set; }

    [Required]
    [DefaultValue(0)]
    public int NumberSuccess { get; set; }

    [Required]
    [DefaultValue(0)]
    public int NumberFailed { get; set; }

    [Required]
    [DefaultValue(BroadcastProcess.DRAFT)]
    public BroadcastProcess Process { get; set; }

    public Guid ProfileId { get; set; }

    [AllowNull]
    public string? SendKey { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Profile Profile { get; set; }

    public Guid DataId { get; set; }

    [ForeignKey(nameof(DataId))]
    public Data Data { get; set; }

    public Guid ContentId { get; set; }

    [ForeignKey(nameof(ContentId))]
    public Content Content { get; set; }

    [AllowNull]
    public string? Map { get; set; }

    [NotMapped]
    public IEnumerable<BroadcastObject.KeyAndField> ParseMap
    {
        get
        {
            if (Map.Justifiable())
                return Mapper.Deserialize<
                    List<BroadcastObject.KeyAndField>
                >(Map);

            return [];
        }
    }

    [AllowNull]
    public Guid? MailCredentialId { get; set; }

    [ForeignKey(nameof(MailCredentialId))]
    public MailCredential? MailCredential { get; set; }

    [AllowNull]
    public Guid? ZaloCredentialId { get; set; }

    [ForeignKey(nameof(ZaloCredentialId))]
    public ZaloCredential? ZaloCredential { get; set; }
}
