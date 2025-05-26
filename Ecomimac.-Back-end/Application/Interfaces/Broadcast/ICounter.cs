namespace ReferenceInterface;

public interface ICounterBroadcast
{
    BroadcastObject.Counter Execute(Guid profileId);
}
