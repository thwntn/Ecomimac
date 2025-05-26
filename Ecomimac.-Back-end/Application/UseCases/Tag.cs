namespace ReferenceService;

public class TagService(ITagRepository tagRepository) : ITag
{
    private readonly ITagRepository _tagRepository = tagRepository;

    public Pagination<Tag> List(Guid profileId, QueryOptions queryOptions)
    {
        IQueryable<Tag> tags = _tagRepository
            .GetByCondition(tag => tag.ProfileId == profileId)
            .AsQueryable();

        return new(tags, queryOptions);
    }

    public Tag Information(Guid profileId, Guid tagId)
    {
        Tag tag = _tagRepository.GetById(tagId);
        if (tag.ProfileId.CompareTo(profileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_TAG
            );

        return tag;
    }

    public Tag Create(Guid profileId, TagDataTransformerObject.Create create)
    {
        bool exist = _tagRepository
            .Raw()
            .Any(tag => tag.Name == create.Name && profileId == tag.ProfileId);

        if (exist)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.TAG_ALREADY_EXISTS
            );

        Tag tag = Mapper.Map<Tag>(create);
        tag.ProfileId = profileId;

        _tagRepository.Create(tag);
        return tag;
    }

    public Tag Update(Guid profileId, TagDataTransformerObject.Update update)
    {
        Tag merge = Mapper.Merge(
            _tagRepository.GetById(update.Id),
            update
        );
        if (profileId.CompareTo(merge.ProfileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_TAG
            );

        _tagRepository.Update(merge);
        return merge;
    }

    public string Remove(Guid profileId, Guid tagId)
    {
        Tag tag = _tagRepository.GetById(tagId);

        if (profileId.CompareTo(tag.ProfileId) is not 0)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_TAG
            );

        _tagRepository.Remove(tag);
        return string.Empty;
    }
}
