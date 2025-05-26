namespace ReferenceController;

[ApiController]
[Route(RouteMap.TRASH)]
[Tags(TagName.TRASH)]
public class TrashController(ITrash trashService) : Controller
{
    private readonly ITrash _trashService = trashService;

    [HttpGet]
    [Authorize]
    public IActionResult List()
    {
        var list = _trashService.List();
        return Ok(list);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Add([FromBody] TrashDataTransformer.Add add)
    {
        var storage = _trashService.Add(add.StorageId);
        return Ok(storage);
    }

    [Authorize]
    [HttpPatch(nameof(Restore) + "/{storageId}")]
    public IActionResult Restore([FromRoute] Guid storageId)
    {
        var stoagre = _trashService.Restore(storageId);
        return Ok(stoagre);
    }

    [Authorize]
    [HttpDelete("/{storageId}")]
    public IActionResult Remove([FromRoute] Guid storageId)
    {
        var message = _trashService.Remove(storageId);
        return Ok(message);
    }
}
