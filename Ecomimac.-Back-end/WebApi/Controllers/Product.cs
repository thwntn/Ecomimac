namespace ReferenceController;

[ApiController]
[Route(RouteMap.PRODUCTS)]
[Tags(TagName.PRODUCTS)]
public class ProductController(IProduct productService, IJwt jwtService)
    : Controller
{
    private readonly IProduct _productService = productService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var products = _productService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(products);
    }

    [Authorize]
    [HttpGet("{productId}")]
    public IActionResult Info([FromRoute] Guid productId)
    {
        var products = _productService.Info(productId);
        return Ok(products);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] ProductDataTransformer.Create create)
    {
        var product = _productService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(product);
    }

    [Authorize]
    [HttpPatch("{productId}")]
    public IActionResult Update(
        [FromRoute] Guid productId,
        [FromBody] ProductDataTransformer.Update update
    )
    {
        var product = _productService.Update(
            _jwtService.Information().ProfileId,
            productId,
            update
        );
        return Ok(product);
    }

    [Authorize]
    [HttpDelete]
    public IActionResult Remove([FromBody] List<Guid> Ids)
    {
        var message = _productService.Remove(
            _jwtService.Information().ProfileId,
            Ids
        );
        return Ok(message);
    }

    [Authorize]
    [HttpPost(RouteMap.UPDATE_IMAGE + "/{productId}")]
    public async Task<IActionResult> UpdateImage(
        [FromForm] IFormCollection form,
        [FromRoute] Guid productId
    )
    {
        var product = await _productService.UpdateImage(
            _jwtService.Information().ProfileId,
            productId,
            form.Files
        );
        return Ok(product);
    }
}
