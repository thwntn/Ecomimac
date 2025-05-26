namespace ReferenceController;

[ApiController]
[Route(RouteMap.ROLES)]
[Tags(TagName.ROLES)]
public class RoleController(IRole roleService) : Controller
{
    private readonly IRole _roleService = roleService;

    [Authorize]
    [HttpGet(RouteMap.ACCOUNT)]
    public IActionResult RoleAccount()
    {
        var list = _roleService.RoleAccount();
        return Ok(list);
    }

    [HttpPatch(RouteMap.ASSIGN_ROLE)]
    public IActionResult AssignRole(
        [FromBody] RoleDatabaseTransformer.AssignRole assignRole
    )
    {
        var roleAccount = _roleService.AssignRole(assignRole);
        return Ok(roleAccount);
    }

    [HttpPatch(RouteMap.UNASSIGN_ROLE)]
    public IActionResult UnassignRole(
        [FromBody] RoleDatabaseTransformer.UnassignRole unassignRole
    )
    {
        var message = _roleService.UnassignRole(unassignRole);
        return Ok(message);
    }

    [HttpPatch(RouteMap.MAKE_ADMIN)]
    public IActionResult MakeAdmin(
        [FromBody] RoleDatabaseTransformer.MakeAdmin makeAdmin
    )
    {
        var roles = _roleService.MakeAdminAccount(makeAdmin.AccountId);
        return Ok(roles);
    }

    [HttpGet]
    public IActionResult List()
    {
        var list = _roleService.List();
        return Ok(list);
    }
}
