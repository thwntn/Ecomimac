namespace ReferenceController;

[Route(RouteMap.DASHBOARDS)]
[Tags(TagName.DASHBOARDS)]
[ApiController]
public class DashboardController(IDashboard dashboardService, IJwt jwtService)
    : Controller
{
    private readonly IDashboard _dashboardService = dashboardService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet(RouteMap.EXPENDITURE)]
    public IActionResult Expenditure()
    {
        Information information = _jwtService.Information();
        var expenditure = _dashboardService.Expenditure(information.ProfileId);
        return Ok(expenditure);
    }
}
