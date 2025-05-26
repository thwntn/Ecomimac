namespace ReferenceFeature;

public class Reader
{
    private static string _storageHost;
    private static string _prefix;

    private static readonly string _environmentFile = ".env";
    private static readonly char _prefixContent = '"';
    private static readonly char _prefixBreak = '=';

    public static async Task<int> CountLine(string path)
    {
        StreamReader reader = new(path);
        int count = 0;
        while ((await reader.ReadLineAsync()).Justifiable())
            count++;

        reader.Close();
        return count;
    }

    public static async Task<ReaderObject.ReadLine> ReadLine(
        string path,
        int start,
        int loop
    )
    {
        try
        {
            var records = Enumerable
                .Range(0, 0)
                .Select(_ => string.Empty)
                .ToList();
            StreamReader reader = new(path);
            int count = await CountLine(path);

            for (int index = 0; index < count; index++)
            {
                if (index >= (start + loop))
                    break;

                //
                //  Summary:
                //      Read content from file
                //
                //  Returns:
                //
                if (index < start)
                    continue;
                else
                    records.Add(reader.ReadLine());
            }

            return new(records, count);
        }
        catch
        {
            return new([]);
        }
    }

    public static void Configure()
    {
        try
        {
            FileStream fileStream = File.OpenRead(
                $"{Directory.GetCurrentDirectory()}/Configure/{_environmentFile}"
            );
            StreamReader streamReader = new(
                fileStream,
                Encoding.UTF8,
                true,
                128
            );
            string content;
            while ((content = streamReader.ReadLine()) is not null)
            {
                int index = content.IndexOf(_prefixBreak);
                if (index is -1 || index is 0)
                    continue;

                Environment.SetEnvironmentVariable(
                    content[..index],
                    content
                        .Substring(++index, content.Length - index)
                        .Replace(_prefixContent.ToString(), string.Empty)
                );
            }
            streamReader.Close();

            _storageHost = Environment.GetEnvironmentVariable(
                nameof(EnvironmentNames.Storage)
            );
            _prefix = Environment.GetEnvironmentVariable(
                nameof(EnvironmentNames.Media)
            );
        }
        catch (Exception exception)
        {
            Logger.Warning(MessageConstant.NOT_FOUNT_ENVIRONMENT_FILE);
            Logger.Log(exception.Message);
            throw new Exception();
        }
    }

    public static FileStream ReadFile(string fileName, string path = default)
    {
        try
        {
            FileStream stream = new(
                Format.ConcatPathName(
                    _prefix,
                    path.Justifiable() ? path : string.Empty,
                    fileName
                ),
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

    public static async Task<ReaderObject.Blob> Save(
        IFormFile file,
        string path
    )
    {
        string fileName =
            Cryptography.RandomGuid() + Path.GetExtension(file.FileName);
        string directory =
            Directory.GetCurrentDirectory() + $"/{_prefix}/{path}/";
        Directory.CreateDirectory(directory);

        FileStream stream = File.Create(directory + fileName);
        await file.CopyToAsync(stream);

        stream.Close();
        return new ReaderObject.Blob(
            file.Name,
            fileName,
            fileName,
            file.Length
        );
    }

    public static ReaderObject.Blob GetSize(IFormFile file)
    {
        ReaderObject.Blob info = new(
            file.Name,
            string.Empty,
            string.Empty,
            file.Length
        );
        return info;
    }

    public static string CreateURL(string path)
    {
        if (_storageHost is null)
            Logger.Warning(nameof(_storageHost));

        return $"{_storageHost}/{RouteMap.MEDIA}/{RouteMap.FILE}/{path}";
    }

    public static string Thumbnail(FileStream file, int downSize = 10)
    {
        string fileName = Cryptography.RandomGuid() + ".jpg";
        Image image = Image.Load(file);
        image.Mutate(x =>
            x.Resize(image.Width / downSize, image.Height / downSize)
        );
        image.SaveAsJpeg(
            Directory.GetCurrentDirectory() + $"/{_prefix}/{fileName}"
        );
        return fileName;
    }

    public static async Task<MemoryStream> ToMemoryStream(IFormFile formFile)
    {
        MemoryStream stream = new();
        await formFile.CopyToAsync(stream);
        stream.Position = 0;
        return stream;
    }
}
