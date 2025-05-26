namespace ReferenceDatabase;

public class Profile(string name, string email, string description)
    : Entity,
        IEntity
{
    [Required]
    public string Name { get; set; } = name;

    [Required]
    public string Avatar { get; set; } = string.Empty;

    [Required]
    public DateTime Birthday { get; set; }

    [Required]
    public string Description { get; set; } = description;

    [Required]
    public string Email { get; set; } = email;

    [NotMapped]
    public DateTime LastLogin { get; set; }

    [Required]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string CoverPicture { get; set; } = string.Empty;

    [AllowNull]
    public string? Address { get; set; }

    [ForeignKey(nameof(AccountId))]
    public Guid AccountId { get; set; }

    public ICollection<Setting> Settings { get; set; }

    public ICollection<Notification> Notifications { get; set; }

    public ICollection<Storage> Storages { get; set; }

    public ICollection<Group> Groups { get; set; }

    public ICollection<GroupMember> GroupMembers { get; set; }

    public ICollection<Plan> Plans { get; set; }

    public ICollection<ExpenseTransaction> ExpenseTransactions { get; set; }

    public ICollection<Note> Notes { get; set; }

    public ICollection<Customer> Customers { get; set; }

    public ICollection<Fund> Fund { get; set; }

    public ICollection<Icon> Icons { get; set; }

    public ICollection<Activity> Activities { get; set; }

    public ICollection<KabanCategory> KabanCategories { get; set; }

    public ICollection<SaleProgram> SalePrograms { get; set; }

    public ICollection<Promotion> Promotions { get; set; }

    public ICollection<Tag> Tags { get; set; }

    public ICollection<Content> Contents { get; set; }
}
