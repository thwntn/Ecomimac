namespace ReferenceService;

public class CreateData(
    IDataRepository dataRepository,
    IFromCustomer fromCustomer,
    IRealtimeData realtimeData
) : ICreateData
{
    private readonly IDataRepository _dataRepository = dataRepository;
    private readonly IRealtimeData _realtimeData = realtimeData;
    private readonly IFromCustomer _fromCustomer = fromCustomer;

    public Data Execute(Guid profileId, DataTransformerObject.Create create)
    {
        Data data = Mapper.Map<Data>(create);
        data.ProfileId = profileId;

        if (create.Type is ReferenceShared.DataType.FROM_CUSTOMER)
            data.Schema = Mapper.Serialize(_fromCustomer.GetColumn());

        _dataRepository.Create(data);
        _realtimeData.Execute(profileId);

        return data;
    }
}
