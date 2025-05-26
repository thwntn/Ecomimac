namespace ReferenceDatabase;

public class Fund(
    string name,
    string description,
    string backgroundUrl,
    string type,
    string number,
    string author
)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    [Required]
    public string Name { get; set; } = name;

    [Required]
    public string Description { get; set; } = description;

    [Required]
    public string BackgroundUrl { get; set; } = backgroundUrl;

    [Required]
    public string Type { get; set; } = type;

    [Required]
    public string Number { get; set; } = number;

    [Required]
    public string Author { get; set; } = author;

    public long Total;

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public ICollection<Cash> Cashes { get; set; }
}
