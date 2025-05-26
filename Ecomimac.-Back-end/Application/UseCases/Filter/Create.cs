namespace ReferenceService;

public class CreateFilter(
    IDataRepository dataRepository,
    IFilterRepository filterRepository,
    IRealtimeData realtimeData
) : ICreateFilter
{
    private readonly IDataRepository _dataRepository = dataRepository;
    private readonly IRealtimeData _realtimeData = realtimeData;
    private readonly IFilterRepository _filterRepository = filterRepository;

    public Filter Execute(Guid profileId, FilterDataTransformer.Create create)
    {
        Data data = _dataRepository.GetById(create.DataId);
        if (data.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DATA
            );

        Filter filter = Mapper.Map<Filter>(create);
        _filterRepository.Create(filter);
        _realtimeData.UpdateInformation(profileId);
        return filter;
    }
}
