namespace ReferenceDatabase;

public class KabanCategory(string name)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; } = name;

    [Required]
    public DateTime Created { get; set; } = new();

    [Required]
    public DateTime Updated { get; set; }

    public ICollection<Kaban> Kabans { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }
}
