namespace ReferenceFeature;

public class Mapper
{
    public static string Serialize(object obj) =>
        JsonConvert.SerializeObject(
            obj,
            Formatting.None,
            new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                NullValueHandling = NullValueHandling.Ignore,
            }
        );

    public static TFormat Deserialize<TFormat>(string json) =>
        JsonConvert.DeserializeObject<TFormat>(json);

    public static string JsonString(object json) =>
        JsonConvert.ToString(JsonConvert.SerializeObject(json));

    public static TFormat Map<TFormat>(object data) =>
        Deserialize<TFormat>(Serialize(data));

    public static TFormat Merge<TFormat>(TFormat destination, object host)
    {
        Dictionary<string, object> wait = Map<Dictionary<string, object>>(
            destination
        );
        Dictionary<string, object> trigger = Map<Dictionary<string, object>>(
            host
        );

        foreach (string key in trigger.Keys)
            if (wait.ContainsKey(key) is true)
                wait[key] = trigger[key];
            else
                wait.Add(key, trigger[key]);

        return Map<TFormat>(wait);
    }
}
