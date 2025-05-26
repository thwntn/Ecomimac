namespace ReferenceDatabase;

[PrimaryKey(nameof(SaleProgramId), nameof(PromotionId))]
public class SaleProgramPromotion(Guid promotionId, Guid saleProgramId)
{
    [ForeignKey(nameof(SaleProgramId))]
    public Guid SaleProgramId { get; set; } = saleProgramId;

    public SaleProgram SaleProgram { get; set; }

    [ForeignKey(nameof(PromotionId))]
    public Guid PromotionId { get; set; } = promotionId;

    public Promotion Promotion { get; set; }
}
