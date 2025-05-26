namespace ReferenceDatabase;

public class Storage
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    [Required]
    public string DisplayName { get; set; }

    [Required]
    public string MapName { get; set; }

    [Required]
    public Guid Parent { get; set; }

    [Required]
    public string Url { get; set; }

    public string Thumbnail { get; set; }

    [Required]
    public StorageNames Type { get; set; }

    [Required]
    public StorageStatus Status { get; set; }

    [Required]
    public long Size { get; set; }

    [AllowNull]
    [ForeignKey(nameof(GroupId))]
    public Guid? GroupId { get; set; }

    public Group Group { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }
}
