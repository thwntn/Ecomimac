namespace ReferenceService;

public class ZaloNotificationServicePreview(IRequest request)
    : IZaloNotificationServicePreview
{
    private readonly IRequest _request = request;

    public async Task<string> Execute(string templateId)
    {
        string response = await _request.Get(
            "https://account.zalo.cloud/znspreview/QHykwR6niI-D1IidiArsDA==",
            default,
            default
        );

        return response;
    }
}
