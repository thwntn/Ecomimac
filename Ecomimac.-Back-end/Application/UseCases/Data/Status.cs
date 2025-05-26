namespace ReferenceService;

public class StatusData : IStatusData
{
    public IEnumerable<DataObject.Status> Execute()
    {
        {
            string define = File.ReadAllText(
                $"{Directory.GetCurrentDirectory()}/Common/Metadata/DataStatus.json"
            );

            IEnumerable<DataObject.Status> status = Mapper.Deserialize<
                IEnumerable<DataObject.Status>
            >(define);

            return status;
        }
    }
}
