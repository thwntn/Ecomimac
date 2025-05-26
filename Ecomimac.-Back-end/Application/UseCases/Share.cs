namespace ReferenceService;

public class ShareService(IConnectionHub connectionHubService) : IShare
{
    private readonly string _pathFolder = Environment.GetEnvironmentVariable(
        nameof(EnvironmentNames.Media)
    );
    private readonly IConnectionHub _connectionHubService =
        connectionHubService;

    public async Task Transfer(IFormFile file, int accountId)
    {
        string tempFolderName = Cryptography.RandomGuid().ToString();
        ReaderObject.Blob blob = await Reader.Save(file, tempFolderName);

        string currentLocation =
            $"{Directory.GetCurrentDirectory()}/{_pathFolder}/{tempFolderName}";
        string pathCompress = $"{currentLocation}.zip";
        ZipFile.CreateFromDirectory(currentLocation, pathCompress);

        MShare.CompressItem compressItem = new MShare.CompressItem(
            $"{tempFolderName}.zip",
            Reader.CreateURL($"{tempFolderName}.zip"),
            blob.Size,
            new()
        );
        _connectionHubService.Invoke(
            string.Concat(accountId),
            nameof(HubMethodName.UPDATE_LIST_FILE),
            compressItem
        );
    }
}
