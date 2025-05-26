namespace ReferenceInterface;

public interface IRealtimeBroadcast
{
    void Execute(Guid profileId);
    public void Information(Guid profileId);
}
