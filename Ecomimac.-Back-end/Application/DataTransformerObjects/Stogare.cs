namespace ReferenceDataTransformer;

public class StorageDataTransformer
{
    public class CreateFolder
    {
        [JsonRequired]
        public string Name { get; set; }

        public Guid GroupId { get; set; }
    }

    public class Move
    {
        [JsonRequired]
        public Guid StorageId { get; set; }

        [JsonRequired]
        public Guid DestinationId { get; set; }
    }

    public class Rename
    {
        [JsonRequired]
        public string Name { get; set; }
    }

    public class Storage
    {
        [JsonRequired]
        public int Id { get; set; }

        [JsonRequired]
        public DateTime Created { get; set; } = Timebase.Now();

        [JsonRequired]
        public string DisplayName { get; set; }

        [JsonRequired]
        public string MapName { get; set; }

        [JsonRequired]
        public string Parent { get; set; }

        [JsonRequired]
        public StorageStatus Status { get; set; }

        [JsonRequired]
        public StorageNames Type { get; set; }

        [JsonRequired]
        public string Thumbnail { get; set; }

        [JsonRequired]
        public string Url { get; set; }

        [JsonRequired]
        public int AccountId { get; set; }

        public Guid GroupId { get; set; }
    }
}
