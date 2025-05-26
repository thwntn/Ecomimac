namespace ReferenceDatabase;

public class Filter : Entity, IEntity
{
    [Required]
    public string Column { get; set; }

    [Required]
    public string Value { get; set; }

    [Required]
    public Condition Operator { get; set; }

    [Required]
    public Guid DataId { get; set; }

    [ForeignKey(nameof(DataId))]
    public Data Data { get; set; }
}
