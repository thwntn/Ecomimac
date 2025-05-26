namespace ReferenceInterface;

public interface IImportData
{
    public List<string> ReadExcel(
        MemoryStream stream,
        Action<List<object>, List<string>> action,
        bool isPreview = false
    );
    string Execute(Guid profileId, Guid dataId, MemoryStream stream);
}
