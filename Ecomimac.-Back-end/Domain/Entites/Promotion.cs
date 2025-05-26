namespace ReferenceDatabase;

public class Promotion : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [DefaultValue(PromotionType.BOGO)]
    public PromotionType PromotionType { get; set; }

    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    public ICollection<PromotionTag> PromotionTags { get; set; }

    public ICollection<PromotionProduct> PromotionProducts { get; set; }
}
