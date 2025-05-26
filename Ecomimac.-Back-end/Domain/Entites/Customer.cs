namespace ReferenceDatabase;

public class Customer(string name, string phone, Guid profileId)
    : Entity,
        IEntity
{
    [Required]
    public string Name { get; set; } = name;

    [Required]
    public ICollection<CustomerTag> CustomerTags { get; set; }

    [AllowNull]
    public string? FullName { get; set; } = string.Empty;

    [AllowNull]
    public string? Address { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = phone;

    [AllowNull]
    public DateTime? Birthday { get; set; }

    [AllowNull]
    public string? EmailAddress { get; set; }

    [AllowNull]
    public string? Image { get; set; }

    [ForeignKey(nameof(ProfileId))]
    public Guid ProfileId { get; set; } = profileId;

    public Profile Profile { get; set; }

    public ICollection<Invoice> Invoices { get; set; }
}
