using System.Threading.Tasks;

namespace ReferenceController;

[ApiController]
[Route(RouteMap.BROADCASTS)]
[Tags(TagName.BROADCASTS)]
public class BroadcastController(
    IBroadcast broadcastService,
    IUpdateReferenceBroadcast UpdateReference,
    ICloneBroadcast cloneBroadcast,
    IActiveBroadcast activeBroadcast,
    IListHistory listHistory,
    IStatusBroadcast statusBroadcast,
    IStopBroadcast stopBroadcast,
    ICounterBroadcast counterBroadcast,
    IRemoveBroadcast removeBroadcast,
    ICounterHistory counterHistory,
    IRenameBroadcast renameBroadcast,
    IJwt jwtService,
    IModeBroadcast modeBroadcast,
    ILoopBroadcast loopBroadcast
) : Controller
{
    private readonly IUpdateReferenceBroadcast _updateReference =
        UpdateReference;
    private readonly IBroadcast _broadcastService = broadcastService;
    private readonly IRenameBroadcast _renameBroadcast = renameBroadcast;
    private readonly IStatusBroadcast _statusBroadcast = statusBroadcast;
    private readonly ICounterBroadcast _counterBroadcast = counterBroadcast;
    private readonly ICounterHistory _counterHistory = counterHistory;
    private readonly IStopBroadcast _stopBroadcast = stopBroadcast;
    private readonly IActiveBroadcast _activeBroadcast = activeBroadcast;
    private readonly ILoopBroadcast _loopBroadcast = loopBroadcast;
    private readonly ICloneBroadcast _cloneBroadcast = cloneBroadcast;
    private readonly IListHistory _listHistory = listHistory;
    private readonly IModeBroadcast _modeBroadcast = modeBroadcast;
    private readonly IJwt _jwtService = jwtService;

    [Authorize]
    [HttpGet]
    public IActionResult List([FromQuery] QueryOptions queryOptions)
    {
        var broadcast = _broadcastService.List(
            _jwtService.Information().ProfileId,
            queryOptions
        );
        return Ok(broadcast);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create(
        [FromBody] BroadcastDataTransformerObject.Create create
    )
    {
        var broadcast = _broadcastService.Create(
            _jwtService.Information().ProfileId,
            create
        );
        return Ok(broadcast);
    }

    [Authorize]
    [HttpPatch("{broadcastId}/" + RouteMap.REFERENCE)]
    public IActionResult Update(
        [FromRoute] Guid broadcastId,
        [FromBody]
            BroadcastDataTransformerObject.UpdateReferenceData updateReferenceData
    )
    {
        var broadcast = _updateReference.Execute(
            _jwtService.Information().ProfileId,
            broadcastId,
            updateReferenceData
        );
        return Ok(broadcast);
    }

    [Authorize]
    [HttpPatch(RouteMap.BROADCAST_CHANGE_DATA)]
    public IActionResult ChangeData(
        [FromRoute] Guid broadcastId,
        [FromBody] BroadcastDataTransformerObject.UpdateData updateData
    )
    {
        var broadcast = _updateReference.UpdateData(
            _jwtService.Information().ProfileId,
            broadcastId,
            updateData
        );
        return Ok(broadcast);
    }

    [Authorize]
    [HttpPatch(RouteMap.ACTIVE + "/{broadcastId}")]
    public async Task<IActionResult> Active([FromRoute] Guid broadcastId)
    {
        var active = await _activeBroadcast.Execute(
            _jwtService.Information().ProfileId,
            broadcastId
        );
        return Ok(active);
    }

    [Authorize]
    [HttpPatch(RouteMap.BROADCAST_CHANGE_CONTENT)]
    public IActionResult Content(
        [FromRoute] Guid broadcastId,
        [FromBody] BroadcastDataTransformerObject.UpdateContent updateContent
    )
    {
        var broadcast = _updateReference.UpdateContent(
            _jwtService.Information().ProfileId,
            broadcastId,
            updateContent
        );
        return Ok(broadcast);
    }

    [Authorize]
    [HttpPatch(RouteMap.BROADCAST_STOP)]
    public IActionResult Stop([FromRoute] Guid broadcastId)
    {
        var broadcast = _stopBroadcast.Execute(
            _jwtService.Information().ProfileId,
            broadcastId
        );
        return Ok(broadcast);
    }

    [Authorize]
    [HttpDelete("{broadcastId}")]
    public IActionResult Remove([FromRoute] Guid broadcastId)
    {
        var message = removeBroadcast.Execute(
            _jwtService.Information().ProfileId,
            broadcastId
        );

        return Ok(message);
    }

    [Authorize]
    [HttpGet(RouteMap.CHANNEL)]
    public IActionResult Mode()
    {
        var modes = _modeBroadcast.Execute();
        return Ok(modes);
    }

    [Authorize]
    [HttpGet(RouteMap.STATUS)]
    public IActionResult Status()
    {
        var status = _statusBroadcast.Execute();
        return Ok(status);
    }

    [Authorize]
    [HttpGet(RouteMap.BROADCAST_HISTORY_COUNTER)]
    public IActionResult Counter([FromRoute] Guid broadcastId)
    {
        var counter = _counterHistory.Execute(
            _jwtService.Information().ProfileId,
            broadcastId
        );
        return Ok(counter);
    }

    [Authorize]
    [HttpGet(RouteMap.BROADCAST_COUNTER)]
    public IActionResult Counter()
    {
        var counter = _counterBroadcast.Execute(
            _jwtService.Information().ProfileId
        );
        return Ok(counter);
    }

    [Authorize]
    [HttpGet("{broadcastId}/" + RouteMap.HISTORY)]
    public async Task<IActionResult> History(
        [FromRoute] Guid broadcastId,
        [FromQuery] QueryOptions queryOptions
    )
    {
        Pagination<HistoryObject.Response> histories =
            await _listHistory.Execute(
                _jwtService.Information().ProfileId,
                broadcastId,
                queryOptions
            );
        //
        //  Summary:
        //      Map response data
        //
        //  Returns:
        //
        return Ok(histories);
    }

    [Authorize]
    [HttpGet("{broadcastId}/" + RouteMap.CLONE)]
    public IActionResult Clone([FromRoute] Guid broadcastId)
    {
        Broadcast broadcast = _cloneBroadcast.Execute(
            _jwtService.Information().ProfileId,
            broadcastId
        );

        //
        //  Summary:
        //      Map response data
        //
        //  Returns:
        //
        return Ok(broadcast);
    }

    [Authorize]
    [HttpPatch("{broadcastId}/" + RouteMap.RENAME)]
    public IActionResult Rename(
        [FromRoute] Guid broadcastId,
        [FromBody] BroadcastDataTransformerObject.Rename rename
    )
    {
        Broadcast broadcast = _renameBroadcast.Execute(
            _jwtService.Information().ProfileId,
            broadcastId,
            rename.Name
        );
        //
        //  Summary:
        //      Map response data
        //
        //  Returns:
        //
        return Ok(broadcast);
    }

    [Authorize]
    [HttpGet("{broadcastId}/" + RouteMap.LOOP)]
    public async Task<IActionResult> Loop([FromRoute] Guid broadcastId)
    {
        Broadcast broadcast = await _loopBroadcast.Execute(
            _jwtService.Information().ProfileId,
            broadcastId
        );
        //
        //  Summary:
        //      Map response data
        //
        //  Returns:
        //
        return Ok(broadcast);
    }

    [Authorize]
    [HttpGet("{broadcastId}")]
    public IActionResult Information([FromRoute] Guid broadcastId)
    {
        var message = _broadcastService.Information(
            _jwtService.Information().ProfileId,
            broadcastId
        );
        return Ok(message);
    }
}
