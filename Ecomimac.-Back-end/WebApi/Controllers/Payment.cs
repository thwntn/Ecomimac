namespace ReferenceController;

[ApiController]
[Route(RouteMap.PAYMENTS)]
[Tags(TagName.PAYMENTS)]
public class PaymentController(IJwt jwtService, IPayment paymentService)
    : Controller
{
    private readonly IJwt _jwtService = jwtService;
    private readonly IPayment _paymentService = paymentService;

    [Authorize]
    [HttpGet]
    public IActionResult List()
    {
        var payments = _paymentService.List();
        return Ok(payments);
    }

    [Authorize]
    [HttpGet("{paymentMethod}")]
    public IActionResult List([FromRoute] PaymentMethod paymentMethod)
    {
        var payment = _paymentService.Information(paymentMethod);
        return Ok(payment);
    }
}
