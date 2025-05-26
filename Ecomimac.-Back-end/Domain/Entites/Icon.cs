namespace ReferenceDatabase;

public class Icon(string name, string description, string directory)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    public DateTime Updated { get; set; }

    [Required]
    public string Name { get; set; } = name;

    [Required]
    public string Description { get; set; } = description;

    [Required]
    public string Directory { get; set; } = directory;

    [AllowNull]
    [ForeignKey(nameof(ProfileId))]
    public Guid? ProfileId { get; set; }

    public Profile Profile { get; set; }
}
