namespace ReferenceController;

[ApiController]
[Route(RouteMap.PROMOTIONS)]
[Tags(TagName.PROMOTIONS)]
public class PromotionController(IPromotion promotionService, IJwt jwtService)
    : Controller
{
    private readonly IPromotion _promotionService = promotionService;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpDelete("{promotionId}")]
    public IActionResult Remove([FromRoute] Guid promotionId)
    {
        var message = _promotionService.Remove(
            _jwtService.Information().ProfileId,
            promotionId
        );
        return Ok(message);
    }

    [HttpPut]
    [Authorize]
    public IActionResult Update(
        [FromBody] PromotionDataTransformer.Update update
    )
    {
        var promotion = _promotionService.Update(
            _jwtService.Information().ProfileId,
            update
        );
        return Ok(promotion);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create(
        [FromBody] PromotionDataTransformer.Create create
    )
    {
        var promotion = _promotionService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(promotion);
    }

    [HttpGet]
    [Authorize]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var list = _promotionService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(list);
    }

    [HttpGet("{promotionId}")]
    public IActionResult Information([FromRoute] Guid promotionId)
    {
        var information = _promotionService.Information(
            _jwtService.Information().ProfileId,
            promotionId
        );
        return Ok(information);
    }
}
