namespace ReferenceDatabase;

[PrimaryKey(nameof(SaleProgramId), nameof(DiscountId))]
public class SaleProgramDiscount(Guid discountId, Guid saleProgramId)
{
    [ForeignKey(nameof(SaleProgramId))]
    public Guid SaleProgramId { get; set; } = saleProgramId;

    public SaleProgram SaleProgram { get; set; }

    [ForeignKey(nameof(DiscountId))]
    public Guid DiscountId { get; set; } = discountId;

    public Discount Discount { get; set; }
}
