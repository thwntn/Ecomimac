namespace ReferenceDatabase;

public class SaleProgram : Entity, IEntity
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public DateTime FromDate { get; set; }

    [Required]
    public DateTime ToDate { get; set; }

    [Required]
    [DefaultValue(SaleProgramStatus.NOT_ACTIVE)]
    public SaleProgramStatus Status { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; }

    public Profile Profile { get; set; }

    public ICollection<SaleProgramPromotion> SaleProgramPromotions { get; set; }

    public ICollection<SaleProgramDiscount> SaleProgramDiscounts { get; set; }

    public ICollection<SaleProgramProduct> SaleProgramProducts { get; set; }
}
