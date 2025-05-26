namespace ReferenceInterface;

public interface IIcon
{
    IEnumerable<Icon> List();
    Icon Create(IconDataTransformer.Create create);
    string Remove(Guid iconId);
}
