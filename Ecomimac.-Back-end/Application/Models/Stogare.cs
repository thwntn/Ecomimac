namespace ReferenceModel;

public class MStorage
{
    public class StorageWithCounter : Storage
    {
        public long counter;
        public long counterSize;
    }

    public class StorageWithThumbnail(string key, string fileName, string path, long size, string thumbnail)
        : ReaderObject.Blob(key, fileName, path, size)
    {
        private readonly string _thumbnail = thumbnail;

        public string GetThumbnail()
        {
            return _thumbnail;
        }
    }

    public class StorageWithLevel : Storage
    {
        public int level;
    }
}
