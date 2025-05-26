namespace ReferenceController;

[ApiController]
[Route(RouteMap.FILTER)]
[Tags(TagName.FILTER)]
public class FilterController(
    ICreateFilter createFilter,
    IJwt jwt,
    IOperator @operator,
    IRemoveFilter removeFilter
) : Controller
{
    private readonly ICreateFilter _createFilter = createFilter;
    private readonly IRemoveFilter _removeFilter = removeFilter;
    private readonly IOperator _operator = @operator;
    private readonly IJwt _jwt = jwt;

    [HttpPost]
    public IActionResult Create([FromBody] FilterDataTransformer.Create create)
    {
        var filter = _createFilter.Execute(
            _jwt.Information().ProfileId,
            create
        );
        return Ok(filter);
    }

    [HttpGet(RouteMap.OPERATOR)]
    public IActionResult Operator()
    {
        var operators = _operator.Execute();
        return Ok(operators);
    }

    [HttpDelete("{filterId}")]
    public IActionResult Remove([FromRoute] Guid filterId)
    {
        var message = _removeFilter.Execute(
            _jwt.Information().ProfileId,
            filterId
        );
        return Ok(message);
    }
}
