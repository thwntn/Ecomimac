namespace ReferenceDatabase;

public class Setting(string name, string value)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    [Required]
    public DateTime Updated { get; set; } = Timebase.Now();

    [Required]
    public string Name { get; set; } = name;

    [Required]
    public string Value { get; set; } = value;

    [AllowNull]
    [ForeignKey(nameof(ProfileId))]
    public Guid? ProfileId { get; set; }

    public Profile Profile { get; set; }
}
