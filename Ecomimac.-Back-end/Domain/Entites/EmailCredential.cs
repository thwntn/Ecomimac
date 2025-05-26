namespace ReferenceDatabase;

public class MailCredential : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string ApiKey { get; set; }

    [Required]
    public string From { get; set; }

    [Required]
    public string Domain { get; set; }

    [Required]
    [DefaultValue(false)]
    public bool Disable { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    public ICollection<Broadcast> Broadcasts { get; set; }
}
