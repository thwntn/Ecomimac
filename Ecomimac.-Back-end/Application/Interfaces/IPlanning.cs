namespace ReferenceInterface;

public interface IPlan
{
    IEnumerable<Plan> List(string weekOfYear);
    Plan Create(PlanDataTransformer.Create create);
    string Remove(Guid planId);
    void SendNotiOrMail();
}
