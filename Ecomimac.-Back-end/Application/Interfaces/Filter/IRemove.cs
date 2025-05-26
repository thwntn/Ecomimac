namespace ReferenceInterface;

public interface IRemoveFilter
{
    string Execute(Guid profileId, Guid filterId);
}
