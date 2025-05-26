namespace ReferenceController;

[ApiController]
[Route(RouteMap.TRANSACTIONS)]
[Tags(TagName.TRANSACTIONS)]
public class TransactionController(ITransaction transactionService) : Controller
{
    private readonly ITransaction _transactionService = transactionService;

    [HttpGet(RouteMap.PAYMENTS + "/{name}")]
    public IActionResult Payment([FromRoute] string name)
    {
        var url = _transactionService.Payment(name);
        return Ok(url);
    }

    [Authorize]
    [HttpGet(RouteMap.PACKAGE)]
    public IActionResult Package()
    {
        var packages = _transactionService.Package();
        return Ok(packages);
    }

    [Authorize]
    [HttpPost(RouteMap.CONFIG + "/{name}")]
    public IActionResult Config(
        [FromRoute] string name,
        [FromBody] TransactionDataTransformer.Create create
    )
    {
        var setting = _transactionService.Config(
            name,
            Mapper.Map<TransactionObject.Package>(create)
        );
        return Ok(setting);
    }

    [HttpPost(RouteMap.VERIFY)]
    public async Task<IActionResult> Verify(
        [FromBody] TransactionDataTransformer.SepayRequest sepayRequest
    )
    {
        var success = await _transactionService.Verify(sepayRequest);
        return Ok(success);
    }
}
