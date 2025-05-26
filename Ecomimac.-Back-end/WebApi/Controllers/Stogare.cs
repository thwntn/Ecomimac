namespace ReferenceController;

[ApiController]
[Route(RouteMap.STORAGES)]
[Tags(TagName.STORAGES)]
public class StorageController(IStorage storageService) : Controller
{
    private readonly IStorage _storageService = storageService;

    [Authorize]
    [HttpGet("{storageId}")]
    public IActionResult List([FromRoute] Guid storageId)
    {
        var storages = _storageService.List(storageId);
        return Ok(storages);
    }

    [Authorize]
    [HttpGet(RouteMap.FOLDER)]
    public IActionResult Folders()
    {
        var storages = _storageService.Folders();
        return Ok(storages);
    }

    [Authorize]
    [HttpPost("{storageId}")]
    public IActionResult Create(
        [FromBody] StorageDataTransformer.CreateFolder createFolder,
        [FromRoute] Guid storageId
    )
    {
        var storage = _storageService.CreateFolder(createFolder, storageId);
        return Ok(storage);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update(
        [FromBody] StorageDataTransformer.Storage storage
    )
    {
        var result = _storageService.Update(
            Mapper.Map<ReferenceDatabase.Storage>(storage)
        );
        return Ok(result);
    }

    [Authorize]
    [HttpPatch(RouteMap.RENAME + "/{storageId}")]
    public IActionResult Rename(
        [FromBody] StorageDataTransformer.Rename rename,
        [FromRoute] Guid storageId
    )
    {
        var storage = _storageService.Rename(storageId, rename);
        return Ok(storage);
    }

    [Authorize]
    [HttpPost(RouteMap.UPLOAD_FILE + "/{storageId}")]
    public async Task<IActionResult> UploadFile(
        [FromForm] IFormCollection form,
        [FromRoute] Guid storageId
    )
    {
        var storages = await _storageService.Upload(form.Files[0], storageId);
        return Ok(storages);
    }

    [Authorize]
    [HttpDelete("{storageId}")]
    public IActionResult Remove([FromRoute] Guid storageId)
    {
        var message = _storageService.Remove(storageId);
        return Ok(message);
    }

    [Authorize]
    [HttpGet(RouteMap.HOME)]
    public IActionResult Home()
    {
        var home = _storageService.Home();
        return Ok(home);
    }

    [Authorize]
    [HttpGet(RouteMap.RECENT)]
    public IActionResult Recent()
    {
        var recent = _storageService.Recent();
        return Ok(recent);
    }

    [Authorize]
    [HttpGet(RouteMap.SEARCH)]
    public IActionResult Search([FromQuery] string content)
    {
        var search = _storageService.Search(content);
        return Ok(search);
    }

    [Authorize]
    [HttpPatch(RouteMap.MOVE)]
    public IActionResult Move([FromBody] StorageDataTransformer.Move move)
    {
        var storage = _storageService.Move(move);
        return Ok(storage);
    }

    [Authorize]
    [HttpGet(RouteMap.DESTINATION + "/{storageId}")]
    public IActionResult ListDestination([FromRoute] Guid storageId)
    {
        var destinations = _storageService.ListDestination(storageId);
        return Ok(destinations);
    }

    [Authorize]
    [HttpGet(RouteMap.CAPTURE + "/{storageId}")]
    public IActionResult Capture([FromRoute] Guid storageId)
    {
        var redirect = _storageService.Redirect(storageId);
        return Ok(redirect);
    }
}
