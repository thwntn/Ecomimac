namespace ReferenceDataTransformer;

public class BroadcastDataTransformerObject
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public string Description { get; set; }

        [JsonRequired]
        public ChannelBroadcast Channel { get; set; }

        [JsonRequired]
        public Guid CredentialId { get; set; }

        [JsonRequired]
        public Guid ContentId { get; set; }

        [JsonRequired]
        public Guid DataId { get; set; }
    }

    public class UpdateReferenceData
    {
        [JsonRequired]
        public Guid DataId { get; set; }

        [JsonRequired]
        public string SendKey { get; set; }

        [JsonRequired]
        public IEnumerable<BroadcastObject.KeyAndField> Maps { get; set; }
    }

    public class UpdateData
    {
        [JsonRequired]
        public Guid DataId { get; set; }
    }

    public class UpdateContent
    {
        [JsonRequired]
        public Guid ContentId { get; set; }
    }

    public class Rename
    {
        [JsonRequired]
        public string Name { get; set; }
    }
}
