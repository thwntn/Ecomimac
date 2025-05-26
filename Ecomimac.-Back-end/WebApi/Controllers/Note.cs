namespace ReferenceController;

[ApiController]
[Route(RouteMap.NOTES)]
[Tags(TagName.NOTES)]
public class NoteController(INote noteService) : Controller
{
    private readonly INote _noteService = noteService;

    [Authorize]
    [HttpGet(RouteMap.STATUS + "/{status}")]
    public IActionResult List(int status)
    {
        var notes = _noteService.List(status);
        return Ok(notes);
    }

    [Authorize]
    [HttpGet("{noteId}")]
    public IActionResult Get([FromRoute] Guid noteId)
    {
        var note = _noteService.Get(noteId);
        return Ok(note);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Create([FromBody] NoteDataTransformer.Create create)
    {
        var note = _noteService.Create(create);
        return Ok(note);
    }

    [Authorize]
    [HttpPatch(RouteMap.MOVE_TO_TRASH + "/{noteId}")]
    public IActionResult MoveToTrash([FromRoute] Guid noteId)
    {
        var message = _noteService.MoveToTrash(noteId);
        return Ok(message);
    }

    [Authorize]
    [HttpPatch(RouteMap.ARCHIVE + "/{noteId}")]
    public IActionResult Archive([FromRoute] Guid noteId)
    {
        var message = _noteService.Archive(noteId);
        return Ok(message);
    }

    [Authorize]
    [HttpPatch(RouteMap.RESTORE + "/{noteId}")]
    public IActionResult Restore([FromRoute] Guid noteId)
    {
        var message = _noteService.Restore(noteId);
        return Ok(message);
    }

    [Authorize]
    [HttpDelete("{noteId}")]
    public IActionResult Remove([FromRoute] Guid noteId)
    {
        var message = _noteService.Remove(noteId);
        return Ok(message);
    }

    [Authorize]
    [HttpPatch(RouteMap.UPDATE_CONTENT + "/{noteId}")]
    public IActionResult UpdateContent(
        [FromRoute] Guid noteId,
        [FromBody] NoteDataTransformer.UpdateContent updateContent
    )
    {
        var note = _noteService.UpdateContent(noteId, updateContent);
        return Ok(note);
    }

    [Authorize]
    [HttpPut]
    public IActionResult Update([FromBody] NoteDataTransformer.Update update)
    {
        var note = _noteService.Update(update);
        return Ok(note);
    }
}
