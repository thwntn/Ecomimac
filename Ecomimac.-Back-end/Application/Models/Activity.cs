namespace ReferenceModel;

public class ActivityObject
{
    public class Create(string type, string jsonData)
    {
        public string Type { get; set; } = type;
        public string JsonData { get; set; } = jsonData;
    }

    public class ActivityResponse
    {
        [NotMapped]
        public AuthObject.ProfileResponse Profile { get; set; }

        [NotMapped]
        public string JsonData { get; set; }

        [NotMapped]
        public DateTime Created { get; set; }

        [NotMapped]
        public string Type { get; set; }
    }
}
