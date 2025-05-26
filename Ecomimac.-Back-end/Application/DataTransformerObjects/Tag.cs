namespace ReferenceDataTransformer;

public class TagDataTransformerObject
{
    public class Create
    {
        [JsonRequired]
        public string Name { get; set; }

        [JsonRequired]
        public string Color { get; set; }
    }

    public class Update : Tag { }
}
