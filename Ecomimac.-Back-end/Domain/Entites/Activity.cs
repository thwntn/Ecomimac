namespace ReferenceDatabase;

public class Activity(string jsonData)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    [Required]
    public DateTime Updated { get; set; } = Timebase.Now();

    [Required]
    public string JsonData { get; set; } = jsonData;

    [Required]
    public string Type { get; set; }

    [Required]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }
}
