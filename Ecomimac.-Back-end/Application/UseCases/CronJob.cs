namespace ReferenceFeature;

public class CronJobService() : IJob
{
    private DatabaseContext _databaseContext;
    private IPlan _planService;

    public Task Execute(IJobExecutionContext jobExecutionContext)
    {
        ServiceProvider serviceProvider = (ServiceProvider)
            jobExecutionContext.MergedJobDataMap[nameof(ServiceProvider)];
        _databaseContext = serviceProvider.GetService<DatabaseContext>();
        _planService = serviceProvider.GetService<IPlan>();
        try
        {
            Logging();
        }
        catch (Exception e)
        {
            Logger.Log(e);
        }
        return Task.CompletedTask;
    }

    public void Logging()
    {
        _planService.SendNotiOrMail();
    }
}
