namespace ReferenceController;

[ApiController]
[Route(RouteMap.INVOICE_STATUS)]
[Tags(TagName.INVOICE_STATUS)]
public class StatusInvoiceController(IStatusInvoice statusInvoiceService)
    : Controller
{
    private readonly IStatusInvoice _statusInvoiceService =
        statusInvoiceService;

    [HttpGet]
    public IActionResult List()
    {
        var statuses = _statusInvoiceService.List();
        return Ok(statuses);
    }
}
