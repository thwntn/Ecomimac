namespace ReferenceService;

public class CreateContent(IContentRepository contentRepository)
    : ICreateContent
{
    private readonly IContentRepository _contentRepository = contentRepository;

    public Content Execute(
        Guid profileId,
        ContentDataTransformerObject.Create create
    )
    {
        Content content = Mapper.Map<Content>(create);
        content.ProfileId = profileId;
        _contentRepository.Create(content);
        return content;
    }
}
