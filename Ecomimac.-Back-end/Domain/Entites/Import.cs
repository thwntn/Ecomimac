namespace ReferenceDatabase;

public class Import(Guid dataId, string jsonRecord) : Entity, IEntity
{
    [Required]
    public string JsonRecord { get; set; } = jsonRecord;

    [NotMapped]
    public object ParseRecord
    {
        get => Mapper.Deserialize<object>(JsonRecord);
    }

    [ForeignKey(nameof(DataId))]
    public Data Data { get; set; }

    [Required]
    public Guid DataId { get; set; } = dataId;
}
