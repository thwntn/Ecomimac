namespace ReferenceService;

public class IconService(DatabaseContext databaseContext) : IIcon
{
    private readonly DatabaseContext _databaseContext = databaseContext;

    public IEnumerable<Icon> List()
    {
        IEnumerable<Icon> icons = _databaseContext.Icon.AsEnumerable();
        return icons;
    }

    public Icon Create(IconDataTransformer.Create create)
    {
        Icon icon = Mapper.Map<Icon>(create);
        icon.ProfileId = null;
        _databaseContext.Icon.Add(icon);
        _databaseContext.SaveChanges();
        return icon;
    }

    public string Remove(Guid iconId)
    {
        Icon icon =
            _databaseContext.Icon.FirstOrDefault(icon => icon.Id == iconId)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ICON
            );
        _databaseContext.Icon.Remove(icon);
        _databaseContext.SaveChanges();
        return string.Empty;
    }
}
