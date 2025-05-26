namespace ReferenceDatabase;

public class Data : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [AllowNull]
    public string? Description { get; set; }

    [AllowNull]
    public string Schema { get; set; }

    [Required]
    public ReferenceShared.DataType Type { get; set; }

    [Required]
    [DefaultValue(DataStatus.INITIALIZE)]
    public DataStatus Status { get; set; }

    [NotMapped]
    public IEnumerable<string> ParseSchema
    {
        get
        {
            if (Schema.Justifiable())
                return Mapper.Deserialize<List<string>>(Schema);

            return [];
        }
    }

    [Required]
    public Guid ProfileId { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Profile Profile { get; set; }

    public ICollection<Import> Imports { get; set; }

    [NotMapped]
    public int QuantityRecord { get; set; }

    public ICollection<Broadcast> Broadcasts { get; set; }

    public ICollection<Filter> Filters { get; set; }

    [NotMapped]
    public DataObject.Import Records { get; set; }
}
