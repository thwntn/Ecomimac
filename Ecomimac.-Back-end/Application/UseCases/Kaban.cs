namespace ReferenceService;

public class KabanService(
    DatabaseContext databaseContext,
    IKabanCategory kabanCategoryService,
    IConnectionHub connectionHubService
) : IKaban
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IKabanCategory _kabanCategoryService =
        kabanCategoryService;
    private readonly IConnectionHub _connectionHubService = connectionHubService;

    public IEnumerable<Kaban> List(Guid profileId)
    {
        IEnumerable<Kaban> kaban = _databaseContext
            .KabanCategory.Include(KabanCategory => KabanCategory.Kabans)
            .Where(KabanCategory => KabanCategory.ProfileId == profileId)
            .SelectMany(KabanCategory => KabanCategory.Kabans);

        return kaban;
    }

    public Kaban Create(Guid profileId, KabanDataTransformer.Create create)
    {
        KabanCategory kabanCategory = _kabanCategoryService.Information(
            profileId,
            create.KabanCategoryId
        );
        Kaban kaban =
            new(create.Title)
            {
                KabanCategoryId = kabanCategory.Id,
                HTMLContent = create.HtmlContent,
            };

        _databaseContext.Add(kaban);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.KANBAN_CATEGORY),
            null
        );

        return kaban;
    }

    public Kaban Move(Guid profileId, KabanDataTransformer.Move move)
    {
        Kaban kaban = _databaseContext.Kaban.FirstOrDefault(kaban =>
            kaban.Id == move.KabanId
            && kaban.KabanCategory.ProfileId == profileId
        );
        KabanCategory kabanCategory = _kabanCategoryService.Information(
            profileId,
            move.DestinationKabanCategoryId
        );

        kaban.KabanCategoryId = kabanCategory.Id;

        _databaseContext.Update(kaban);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.KANBAN_CATEGORY),
            null
        );

        return kaban;
    }

    public async Task<Kaban> Image(Guid profileId, Guid kabanId, IFormFile file)
    {
        Kaban kanban = _databaseContext.Kaban.FirstOrDefault(kanban =>
            kanban.Id == kabanId && kanban.KabanCategory.ProfileId == profileId
        );
        ReaderObject.Blob blob = await Reader.Save(file, string.Empty);
        kanban.Image = Reader.CreateURL(blob.Path);

        _databaseContext.Update(kanban);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.KANBAN_CATEGORY),
            null
        );

        return kanban;
    }

    public string Remove(Guid profileId, Guid kabanId)
    {
        Kaban kaban =
            _databaseContext.Kaban.FirstOrDefault(kaban =>
                kaban.KabanCategory.ProfileId == profileId
                && kaban.Id == kabanId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_KABAN
            );

        _databaseContext.Remove(kaban);
        _databaseContext.SaveChanges();

        _connectionHubService.Invoke(
            profileId.ToString(),
            nameof(HubMethodName.KANBAN_CATEGORY),
            null
        );

        return string.Empty;
    }

    public string Update(Guid profileId, KabanDataTransformer.Update update)
    {
        Kaban kaban =
            _databaseContext.Kaban.FirstOrDefault(kaban =>
                kaban.KabanCategory.ProfileId == profileId
                && kaban.Id == update.Id
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_KABAN
            );

        Kaban merge = Mapper.Merge(kaban, update);
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
