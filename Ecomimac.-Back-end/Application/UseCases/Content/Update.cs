namespace ReferenceService;

public class UpdateContent(
    IContentRepository contentRepository,
    IBroadcastRepository broadcastRepository
) : IUpdateContent
{
    private readonly IBroadcastRepository _broadcastRepository =
        broadcastRepository;
    private readonly IContentRepository _contentRepository = contentRepository;

    public Content Execute(
        Guid profileId,
        ContentDataTransformerObject.Update update
    )
    {
        Content content =
            _contentRepository
                .Include(content => content.Broadcasts)
                .FirstOrDefault(content =>
                    content.Id == update.Id && content.ProfileId == profileId
                )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CONTENT
            );

        IEnumerable<string> maps = DetectMap(update.Text);
        update.Map = Mapper.Serialize(maps);
        UpdateMapField(content.Broadcasts, maps);

        _contentRepository.Update(update);
        return update;
    }

    private void UpdateMapField(
        IEnumerable<Broadcast> broadcasts,
        IEnumerable<string> maps
    )
    {
        foreach (Broadcast broadcast in broadcasts)
            broadcast.Map = Mapper.Serialize(
                maps.Select(map => new BroadcastObject.KeyAndField(
                    default,
                    map
                ))
            );

        _broadcastRepository.Update(broadcasts);
        _broadcastRepository.AsDatabaseContext().ChangeTracker.Clear();
    }

    private static IEnumerable<string> DetectMap(string text)
    {
        System.Text.RegularExpressions.MatchCollection matches =
            System.Text.RegularExpressions.Regex.Matches(
                string.Concat(text),
                @"\{\{(.*?)\}\}"
            );

        IEnumerable<string> maps = matches
            .Select(match => match.Value)
            .Distinct();

        return maps;
    }
}
