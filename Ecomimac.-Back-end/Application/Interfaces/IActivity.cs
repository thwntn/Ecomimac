namespace ReferenceInterface;

public interface IActivity
{
    IEnumerable<Activity> Create(
        Guid profileId,
        IEnumerable<ActivityObject.Create> creates
    );
    Pagination<Activity> List(Guid profileId, QueryOptions queryOptions);
}
