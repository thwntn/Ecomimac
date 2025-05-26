namespace ReferenceService;

public class ListContent(IContentRepository contentRepository) : IListContent
{
    private readonly IContentRepository _contentRepository = contentRepository;

    public Pagination<Content> Execute(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        IEnumerable<Content> contents = _contentRepository
            .Include(content => content.Profile)
            .Where(content => content.ProfileId == profileId)
            .OrderByDescending(content => content.Created);

        return new(contents.AsQueryable(), queryOptions);
    }
}
