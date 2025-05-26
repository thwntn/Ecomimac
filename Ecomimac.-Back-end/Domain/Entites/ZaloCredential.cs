namespace ReferenceDatabase;

public class ZaloCredential : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string RefreshToken { get; set; }

    [Required]
    public string AccessToken { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }
}
