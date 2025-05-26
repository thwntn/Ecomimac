using System.Threading.Tasks;

namespace ReferenceController;

[ApiController]
[Route(RouteMap.DATA)]
[Tags(TagName.DATA)]
public class DataController(
    IInformationData informationData,
    IRecordData recordData,
    ICreateData createData,
    IRemoveData removeData,
    IListData listData,
    IImportData importData,
    ICounterData counterData,
    IStatusData statusData,
    IJwt jwt
) : Controller
{
    private readonly IImportData _importData = importData;
    private readonly ICounterData _counterData = counterData;
    private readonly IStatusData _statusData = statusData;
    private readonly IRemoveData _removeData = removeData;
    private readonly IRecordData _recordData = recordData;
    private readonly IListData _listData = listData;
    private readonly IInformationData _informationData = informationData;
    private readonly ICreateData _createData = createData;
    private readonly IJwt _jwt = jwt;

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] DataTransformerObject.Create create)
    {
        var data = _createData.Execute(_jwt.Information().ProfileId, create);
        return Ok(data);
    }

    [Authorize]
    [HttpPost("{dataId}/" + RouteMap.IMPORT)]
    public async Task<IActionResult> Import(
        [FromRoute] Guid dataId,
        [FromForm] IFormFileCollection formFiles
    )
    {
        IFormFile formFile = formFiles.ElementAt(0);
        using MemoryStream stream = await Reader.ToMemoryStream(formFile);

        var result = _importData.Execute(
            _jwt.Information().ProfileId,
            dataId,
            stream
        );

        //  Summary:
        //      GC auto free memory & clear cache when import excel file
        //
        return Ok(result);
    }

    [Authorize]
    [HttpPost(RouteMap.PREVIEW)]
    public async Task<IActionResult> Preview(
        [FromForm] IFormFileCollection formFiles
    )
    {
        List<object> result = [];

        IFormFile formFile = formFiles.ElementAt(0);
        using MemoryStream stream = await Reader.ToMemoryStream(formFile);

        var schema = _importData.ReadExcel(
            stream,
            (records, schema) => result = [.. records],
            true
        );

        return Ok(new ImportObject.Preview(schema, result));
    }

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var data = _listData.Execute(
            _jwt.Information().ProfileId,
            queryOptions
        );

        return Ok(data);
    }

    [Authorize]
    [HttpGet(RouteMap.COUNTER)]
    public IActionResult Counter()
    {
        var counter = _counterData.Execute(_jwt.Information().ProfileId);
        return Ok(counter);
    }

    [Authorize]
    [HttpGet(RouteMap.STATUS)]
    public IActionResult Status()
    {
        var status = _statusData.Execute();
        return Ok(status);
    }

    [Authorize]
    [HttpDelete("{dataId}")]
    public IActionResult Remove([FromRoute] Guid dataId)
    {
        var message = _removeData.Execute(_jwt.Information().ProfileId, dataId);
        return Ok(message);
    }

    [Authorize]
    [HttpGet("{dataId}")]
    public IActionResult Information([FromRoute] Guid dataId)
    {
        var data = _informationData.Execute(
            _jwt.Information().ProfileId,
            dataId
        );

        return Ok(data);
    }

    [Authorize]
    [HttpGet("{dataId}/" + RouteMap.RECORD)]
    public IActionResult Records(
        [FromRoute] Guid dataId,
        [FromQuery] QueryOptions queryOptions
    )
    {
        var data = _recordData.Execute(
            _jwt.Information().ProfileId,
            dataId,
            queryOptions
        );

        return Ok(data);
    }
}
