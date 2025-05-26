namespace ReferenceService;

public class PlanService(
    DatabaseContext databaseContext,
    INotification notificationService,
    IMail mailService,
    IJwt jwtService
) : IPlan
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly INotification _notificationService = notificationService;
    private readonly IJwt _jwtService = jwtService;
    private readonly IMail _mailService = mailService;

    public IEnumerable<Plan> List(string weekOfYear)
    {
        IEnumerable<Plan> plans = _databaseContext.Plan.Where(plan =>
            plan.ProfileId == _jwtService.Information().ProfileId
            && plan.WeekOfYear == weekOfYear
        );

        return plans;
    }

    public Plan Create(PlanDataTransformer.Create create)
    {
        Plan plan = Mapper.Map<Plan>(create);
        plan.Created = Timebase.Now();
        plan.ProfileId = _jwtService.Information().ProfileId;

        _databaseContext.Add(plan);
        _databaseContext.SaveChanges();
        return plan;
    }

    public string Remove(Guid planId)
    {
        Plan plan =
            _databaseContext.Plan.FirstOrDefault(plan =>
                plan.Id == planId
                && plan.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PLAN
            );

        _databaseContext.Remove(plan);
        _databaseContext.SaveChanges();
        return string.Empty;
    }

    public void SendNotiOrMail()
    {
        // string date = Timebase.Now().ToString("yyyy-MM-dd");
        // string time = Timebase.Now().ToString("HH:mm");
        // IEnumerable<Plan> plans =
        // [
        //     .. _databaseContext
        //         .Plan.Include(plan => plan.Profile)
        //         .Where(plan =>
        //             (plan.SetEmail == true || plan.SetNotification == true) && plan.DateTime == date
        //         )
        // ];

        // IEnumerable<Plan> update = plans.Where(plan =>
        // {
        //     if (plan.SetNotification && DateTime.Parse(plan.From) <= DateTime.Parse(time))
        //     {
        //         _notificationService.Add(plan.ProfileId, plan.ProfileId, NotificationNames.ExpirePlan, plan);
        //         plan.SetNotification = false;
        //         return true;
        //     }
        //     if (plan.SetEmail && DateTime.Parse(plan.From) <= DateTime.Parse(time))
        //     {
        //         plan.SetEmail = false;
        //         _mailService.SendExpirePlan(plan.Profile.Email, Mapper.Serialize(plan));
        //         return true;
        //     }
        //     return false;
        // });

        // _databaseContext.UpdateRange(update);
        // _databaseContext.SaveChanges();
        // _databaseContext.ChangeTracker.Clear();
    }
}
