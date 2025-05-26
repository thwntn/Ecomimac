namespace ReferenceDatabase;

public class Entity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [AllowNull]
    public DateTime Created { get; set; } = Timebase.Now();

    [AllowNull]
    public DateTime? Updated { get; set; } = Timebase.Now();

    [AllowNull]
    public DateTime? Deleted { get; set; }

    [AllowNull]
    public Guid? DeleteBy { get; set; }
}
