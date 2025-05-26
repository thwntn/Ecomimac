namespace ReferenceDatabase;

public class Transaction(
    string transactionId,
    long amount,
    string transactionDate,
    string sepayRequest,
    StatusTransaction status
)
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = Timebase.Now();

    [Required]
    public string TransactionId { get; set; } = transactionId;

    [Required]
    public long Amount { get; set; } = amount;

    [Required]
    public string TransactionDate { get; set; } = transactionDate;

    [Required]
    public string SepayRequest { get; set; } = sepayRequest;

    [Required]
    public StatusTransaction Status { get; set; } = status;

    public string Description { get; set; }
}
