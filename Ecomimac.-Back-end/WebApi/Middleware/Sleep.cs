namespace ReferenceFeature;

public class Sleep(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task Invoke(HttpContext context)
    {
        // Thread.Sleep(5000);

        //  Summary:
        //      Handle request logic & return response
        await _next(context);
    }
}
