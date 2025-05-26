namespace ReferenceDatabase;

public class Content : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public ChannelBroadcast Mode { get; set; }

    public Guid ProfileId { get; set; }

    [AllowNull]
    public string? Map { get; set; }

    [NotMapped]
    public IEnumerable<string> ParseMap
    {
        get
        {
            if (Map.Justifiable())
                return Mapper.Deserialize<List<string>>(Map);

            return [];
        }
    }

    [ForeignKey(nameof(ProfileId))]
    public Profile Profile { get; set; }

    public ICollection<Broadcast> Broadcasts { get; set; }

    public string? Description { get; set; }

    public string? Setup { get; set; }

    public string? Text { get; set; }

    public string? MapField { get; set; }
}
