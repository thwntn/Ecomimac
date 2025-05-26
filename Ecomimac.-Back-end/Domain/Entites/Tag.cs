namespace ReferenceDatabase;

public class Tag : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Color { get; set; }

    [Required]
    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    public ICollection<CustomerTag> CustomerTags { get; set; }
}
