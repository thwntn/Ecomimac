namespace ReferenceInterface;

public interface ISetting
{
    Dictionary<string, string> Get(Guid profileId);
    Dictionary<string, string> Get(IEnumerable<string> configs);
    Setting UpSert(Guid profileId, SettingDataTransformer.Update update);
    Setting UpSert(SettingDataTransformer.Update update);
    string Remove(Guid profileId, Guid settingId);
}
