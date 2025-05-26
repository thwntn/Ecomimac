namespace ReferenceService;

public class InformationContent(IContentRepository contentRepository)
    : IInformationContent
{
    private readonly IContentRepository _contentRepository = contentRepository;

    public Content Execute(Guid profileId, Guid contentId)
    {
        Content content = _contentRepository.GetById(contentId);
        if (content.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_CONTENT
            );

        return content;
    }
}
