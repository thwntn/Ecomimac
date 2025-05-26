namespace ReferenceInterface;

public interface IEntity
{
    //
    // Summary:
    //
    //
    // Returns:
    //
    public Guid Id { get; set; }

    //
    // Summary:
    //
    //
    // Returns:
    //
    public DateTime Created { get; set; }

    //
    // Summary:
    //
    //
    // Returns:
    //
    public DateTime? Deleted { get; set; }

    //
    // Summary:
    //
    //
    // Returns:
    //
    public DateTime? Updated { get; set; }

    //
    // Summary:
    //
    //
    // Returns:
    //
    public Guid? DeleteBy { get; set; }
}
