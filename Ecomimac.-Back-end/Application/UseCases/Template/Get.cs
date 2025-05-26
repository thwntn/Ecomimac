namespace ReferenceService;

public class GetTemplate : IGetTemplate
{
    public FileStream Execute(string fileName)
    {
        try
        {
            FileStream stream = new(
                $"{Directory.GetCurrentDirectory()}/Common/Metadata/{fileName}",
                FileMode.Open,
                FileAccess.Read
            );
            return stream;
        }
        catch (Exception)
        {
            return default;
        }
    }
}
