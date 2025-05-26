namespace ReferenceController;

[ApiController]
[Route(RouteMap.INVOICES)]
[Tags(TagName.INVOICES)]
public class InvoiceController(IInvoice invoiceService, IJwt jwtService)
    : Controller
{
    private readonly IInvoice _invoiceService = invoiceService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet(RouteMap.COUNTER)]
    public IActionResult Counter()
    {
        var statusInvoice = _invoiceService.Counter(
            _jwtService.Information().ProfileId
        );
        return Ok(statusInvoice);
    }

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var invoices = _invoiceService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(invoices);
    }

    [Authorize]
    [HttpGet(RouteMap.LOG + "/{invoiceCode}")]
    public IActionResult Log([FromRoute] string invoiceCode)
    {
        var invoices = _invoiceService.Log(invoiceCode);
        return Ok(invoices);
    }

    [Authorize]
    [HttpGet("{invoiceId}")]
    public IActionResult List([FromRoute] Guid invoiceId)
    {
        var invoice = _invoiceService.Info(
            _jwtService.Information().ProfileId,
            invoiceId
        );
        return Ok(invoice);
    }

    [Authorize]
    [HttpGet(RouteMap.RECENT)]
    public IActionResult Recent([FromRoute] Guid invoiceId)
    {
        var invoices = _invoiceService.Recent(
            _jwtService.Information().ProfileId
        );
        return Ok(invoices);
    }

    [Authorize]
    [HttpGet(RouteMap.DISCOUNTS)]
    public IActionResult Discount([FromRoute] Guid invoiceId)
    {
        var discount = _invoiceService.Discount(
            _jwtService.Information().ProfileId
        );
        return Ok(discount);
    }

    [Authorize]
    [HttpDelete("{invoiceId}")]
    public IActionResult Remove([FromRoute] Guid invoiceId)
    {
        var message = _invoiceService.Remove(
            _jwtService.Information().ProfileId,
            invoiceId
        );
        return Ok(message);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] InvoiceDataTransformer.Create create)
    {
        var invoice = _invoiceService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(invoice);
    }

    [Authorize]
    [HttpPost(RouteMap.SCANNER_PRODUCT)]
    public IActionResult ScannerProduct(
        [FromBody] InvoiceDataTransformer.Scanner scanner
    )
    {
        _invoiceService.ScannerProduct(
            _jwtService.Information().ProfileId,
            scanner
        );
        return Ok(null);
    }

    [Authorize]
    [HttpPatch(RouteMap.STATUS + "/{invoiceProductId}")]
    public IActionResult Status(
        [FromBody] InvoiceDataTransformer.Status status,
        [FromRoute] Guid invoiceProductId
    )
    {
        var invoice = _invoiceService.Status(
            _jwtService.Information().ProfileId,
            invoiceProductId,
            status.InvoiceStatus
        );
        return Ok(invoice);
    }

    [Authorize]
    [HttpPost(RouteMap.ACTIVE_TRANSACTION)]
    public IActionResult ActiveTransaction(
        [FromBody] InvoiceDataTransformer.OpenTransaction openTransaction
    )
    {
        _invoiceService.OpenTransaction(
            _jwtService.Information().ProfileId,
            openTransaction
        );
        return Ok(default);
    }

    [Authorize]
    [HttpGet(RouteMap.CLOSE_TRANSACTION)]
    public IActionResult CloseTransaction()
    {
        _invoiceService.CloseTransaction(_jwtService.Information().ProfileId);
        return Ok(default);
    }

    [Authorize]
    [HttpGet(RouteMap.BANK_ACCOUNT)]
    public IActionResult BankAccount()
    {
        var bankAccount = _invoiceService.BankAccount(
            _jwtService.Information().ProfileId
        );
        return Ok(bankAccount);
    }
}
