namespace ReferenceInterface;

public interface IRealtimeData
{
    void Execute(Guid profileId);
    void UpdateInformation(Guid profileId);
}
