namespace ReferenceService;

public class SettingService(DatabaseContext databaseContext) : ISetting
{
    private readonly DatabaseContext _databaseContext = databaseContext;

    public Dictionary<string, string> Get(Guid profileId)
    {
        IEnumerable<Setting> settings = _databaseContext.Setting.Where(
            setting => setting.ProfileId == profileId
        );

        return settings.ToDictionary(
            key => key.Name,
            value => value.Value.ToString()
        );
    }

    public Dictionary<string, string> Get(IEnumerable<string> configs)
    {
        IEnumerable<Setting> settings = _databaseContext.Setting.Where(
            setting => configs.Contains(setting.Name)
        );

        return settings.ToDictionary(
            key => key.Name,
            value => value.Value.ToString()
        );
    }

    public Setting UpSert(Guid profileId, SettingDataTransformer.Update update)
    {
        Setting setting = _databaseContext.Setting.FirstOrDefault(setting =>
            setting.Name == update.Name && setting.ProfileId == profileId
        );
        if (setting is null)
        {
            Setting create =
                new(update.Name, update.Value) { ProfileId = profileId };
            _databaseContext.Setting.Add(create);
            _databaseContext.SaveChanges();
            return create;
        }

        setting.Value = update.Value;
        _databaseContext.Update(setting);
        _databaseContext.SaveChanges();

        return setting;
    }

    public Setting UpSert(SettingDataTransformer.Update update)
    {
        Setting setting = _databaseContext.Setting.FirstOrDefault(setting =>
            setting.Name == update.Name
        );
        if (setting is null)
        {
            Setting create = new(update.Name, update.Value);
            _databaseContext.Setting.Add(create);
            _databaseContext.SaveChanges();
            return create;
        }

        setting.Value = update.Value;
        _databaseContext.Update(setting);
        _databaseContext.SaveChanges();

        return setting;
    }

    public string Remove(Guid profileId, Guid settingId)
    {
        Setting setting = _databaseContext.Setting.FirstOrDefault(setting =>
            setting.Id == settingId && setting.ProfileId == profileId
        );
        _databaseContext.Remove(setting);
        _databaseContext.SaveChanges();
        return string.Empty;
    }
}
