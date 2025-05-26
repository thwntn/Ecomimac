namespace ReferenceService;

public class KabanCategoryService(
    DatabaseContext databaseContext,
    IConnectionHub connectionHubService
) : IKabanCategory
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IConnectionHub _connectionHubService = connectionHubService;

    public IEnumerable<KabanCategory> List(Guid profileId)
    {
        IEnumerable<KabanCategory> kabanCategory = _databaseContext
            .KabanCategory.Include(kabanCategory => kabanCategory.Kabans)
            .Where(kabanCategory => kabanCategory.ProfileId == profileId);

        return kabanCategory;
    }

    public KabanCategory Information(Guid profileId, Guid kabanCategoryId)
    {
        KabanCategory kabanCategory =
            _databaseContext.KabanCategory.FirstOrDefault(kabanCategory =>
                kabanCategory.ProfileId == profileId
                && kabanCategory.Id == kabanCategoryId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_KABAN_CATEGORY
            );

        return kabanCategory;
    }

    public KabanCategory Create(
        Guid profileId,
        KabanCategoryDataTransformer.Create create
    )
    {
        KabanCategory kabanCategory =
            new(create.Name) { ProfileId = profileId };

        _databaseContext.Add(kabanCategory);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.KANBAN_CATEGORY),
            null
        );

        return kabanCategory;
    }

    public string Remove(Guid profileId, Guid kabanCategoryId)
    {
        KabanCategory kabanCategory =
            _databaseContext.KabanCategory.FirstOrDefault(kabanCategory =>
                kabanCategory.ProfileId == profileId
                && kabanCategory.Id == kabanCategoryId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_KABAN_CATEGORY
            );

        _databaseContext.Remove(kabanCategory);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.KANBAN_CATEGORY),
            null
        );

        return string.Empty;
    }

    public string Update(
        Guid profileId,
        KabanCategoryDataTransformer.Update update
    )
    {
        KabanCategory kabanCategory =
            _databaseContext.KabanCategory.FirstOrDefault(kabanCategory =>
                kabanCategory.ProfileId == profileId
                && kabanCategory.Id == update.Id
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_KABAN_CATEGORY
            );

        KabanCategory merge = Mapper.Merge(kabanCategory, update);
        _databaseContext.Update(merge);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.KANBAN_CATEGORY),
            null
        );

        return string.Empty;
    }
}
