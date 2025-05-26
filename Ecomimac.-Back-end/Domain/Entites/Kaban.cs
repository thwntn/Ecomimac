namespace ReferenceDatabase;

public class Kaban(string title)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public string Title { get; set; } = title;

    [Required]
    public string HTMLContent { get; set; }

    [AllowNull]
    public string? Image { get; set; }

    [ForeignKey(nameof(KabanCategoryId))]
    public Guid KabanCategoryId { get; set; }

    public KabanCategory KabanCategory { get; set; }
}
