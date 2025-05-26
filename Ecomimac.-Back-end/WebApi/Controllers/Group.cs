namespace ReferenceController;

[ApiController]
[Route(RouteMap.GROUPS)]
[Tags(TagName.GROUPS)]
public class GroupController(IGroup groupService, IJwt jwtService) : Controller
{
    private readonly IGroup _groupService = groupService;
    private readonly IJwt _jwtService = jwtService;

    [HttpPost]
    public IActionResult Create(GroupDataTransformer.Create create)
    {
        var group = _groupService.Create(create.GroupName);
        return Ok(group);
    }

    [HttpGet]
    public IActionResult List()
    {
        var groups = _groupService.List();
        return Ok(groups);
    }

    [HttpGet("{groupId}")]
    public IActionResult Info([FromRoute] Guid groupId)
    {
        var info = _groupService.Info(groupId);
        return Ok(info);
    }

    [HttpDelete("{groupId}")]
    public IActionResult Remove(Guid groupId)
    {
        _groupService.Remove(groupId);
        return Ok(null);
    }

    [HttpPost(RouteMap.ADD_MEMBER)]
    public IActionResult AddMember(
        GroupDataTransformer.ModifyMember modifyMember
    )
    {
        var message = _groupService.InviteMember(modifyMember);
        return Ok(message);
    }

    [HttpPatch(RouteMap.REMOVE_MEMBER)]
    public IActionResult RemoveMember(
        GroupDataTransformer.ModifyMember modifyMember
    )
    {
        var remove = _groupService.RemoveMember(modifyMember);
        return Ok(remove);
    }

    [HttpGet(RouteMap.LIST_STORAGE + "/{groupId}")]
    public IActionResult ListStorage([FromRoute] Guid groupId)
    {
        var storages = _groupService.ListStorage(groupId);
        return Ok(storages);
    }

    [HttpPatch(RouteMap.RENAME)]
    public IActionResult Rename([FromBody] GroupDataTransformer.Rename rename)
    {
        var storage = _groupService.Rename(rename);
        return Ok(storage);
    }

    [HttpGet(RouteMap.DESTINATION + "/{groupId}/{storageId}")]
    public IActionResult ListDestination(
        [FromRoute] Guid groupId,
        Guid storageId
    )
    {
        var destinations = _groupService.ListDestination(groupId, storageId);
        return Ok(destinations);
    }

    [HttpGet(RouteMap.REQUEST)]
    public IActionResult ListRequest([FromRoute] Guid groupId, Guid storageId)
    {
        var groups = _groupService.ListRequest();
        return Ok(groups);
    }

    [Authorize]
    [HttpPatch(RouteMap.ACCEPT_INVITE + "/{groupId}")]
    public IActionResult AcceptInvite([FromRoute] Guid groupId)
    {
        var accept = _groupService.AcceptInvite(groupId);
        return Ok(accept);
    }

    [Authorize]
    [HttpPost(RouteMap.CHANGE_IMAGE + "/{groupId}")]
    public async Task<IActionResult> ChangeImage(
        [FromRoute] Guid groupId,
        [FromForm] IFormCollection form
    )
    {
        var group = await _groupService.ChangeImage(groupId, form.Files[0]);
        return Ok(group);
    }
}
