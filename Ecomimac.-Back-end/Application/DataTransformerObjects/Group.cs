namespace ReferenceDataTransformer;

public class GroupDataTransformer
{
    public class Move
    {
        public Guid StorageId { get; set; }
        public int DestinationId { get; set; }
    }

    public class Create
    {
        [JsonRequired]
        public string GroupName { get; set; }
    }

    public class ModifyMember
    {
        [JsonRequired]
        public List<string> Emails { get; set; }

        [JsonRequired]
        public Guid GroupId { get; set; }
    }

    public class Rename
    {
        [JsonRequired]
        public Guid GroupId { get; set; }

        [JsonRequired]
        public string Name { get; set; }
    }
}
