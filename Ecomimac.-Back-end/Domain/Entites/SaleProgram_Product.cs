namespace ReferenceDatabase;

[PrimaryKey(nameof(SaleProgramId), nameof(ProductId))]
public class SaleProgramProduct(Guid productId, Guid saleProgramId)
{
    [ForeignKey(nameof(SaleProgramId))]
    public Guid SaleProgramId { get; set; } = saleProgramId;

    public SaleProgram SaleProgram { get; set; }

    [ForeignKey(nameof(ProductId))]
    public Guid ProductId { get; set; } = productId;

    public Product Product { get; set; }
}
