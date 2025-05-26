namespace ReferenceService;

public class InformationData(IDataRepository dataRepository) : IInformationData
{
    private readonly IDataRepository _dataRepository = dataRepository;

    public Data Execute(Guid profileId, Guid dataId)
    {
        Data data =
            _dataRepository
                .Include(data => data.Broadcasts)
                .Include(data => data.Filters)
                .FirstOrDefault(data =>
                    data.Id == dataId && data.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_DATA
            );

        return data;
    }
}
