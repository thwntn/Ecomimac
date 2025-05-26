namespace ReferenceDatabase;

public class ActivityService(
    DatabaseContext databaseContext,
    ICache cacheService
) : IActivity
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly ICache _cacheService = cacheService;

    public IEnumerable<Activity> Create(
        Guid profileId,
        IEnumerable<ActivityObject.Create> creates
    )
    {
        IEnumerable<string> names = Enum.GetNames(typeof(ActivityNames));
        bool contain = creates.All(create => names.Contains(create.Type));
        if (contain is false)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ACTIVITY_TYPE
            );

        IEnumerable<Activity> activity = creates.Select(create => new Activity(
            create.JsonData
        )
        {
            ProfileId = profileId,
            Type = create.Type,
        });

        _databaseContext.Activity.AddRange(activity);
        _databaseContext.SaveChanges();

        string nameofCache = nameof(Activity) + profileId;
        _cacheService.Reset(nameofCache);
        return activity;
    }

    public Pagination<Activity> List(
        Guid profileId,
        QueryOptions queryOptions
    )
    {
        string nameofCache = nameof(Activity) + profileId;
        IEnumerable<Activity> cache = _cacheService.Get<List<Activity>>(
            nameofCache
        );

        IQueryable<Activity> activities = _databaseContext
            .Activity.Include(activity => activity.Profile)
            .Where(activity => activity.ProfileId == profileId)
            .OrderByDescending(activity => activity.Created);

        return new(activities, queryOptions);
    }
}
