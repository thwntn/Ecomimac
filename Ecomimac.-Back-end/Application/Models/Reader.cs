namespace ReferenceModel;

public class ReaderObject
{
    public class Blob(string key, string fileName, string path, long size)
    {
        public string Key { get; } = key;
        public string FileName { get; } = fileName;
        public string Path { get; } = path;
        public long Size { get; } = size;
    }

    public class ReadLine(IEnumerable<string> lines, int count = 0)
    {
        public IEnumerable<string> Lines { get; set; } = lines;
        public int Count { get; set; } = count;
    }
}
