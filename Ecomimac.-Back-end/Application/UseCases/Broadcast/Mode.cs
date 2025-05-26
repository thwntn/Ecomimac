namespace ReferenceService;

public class ModeBroadcast : IModeBroadcast
{
    public IEnumerable<BroadcastObject.Channel> Execute()
    {
        string define = File.ReadAllText(
            $"{Directory.GetCurrentDirectory()}/Common/Metadata/Channel.json"
        );

        IEnumerable<BroadcastObject.Channel> modes = Mapper.Deserialize<
            IEnumerable<BroadcastObject.Channel>
        >(define);

        return modes;
    }
}
