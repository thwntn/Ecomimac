namespace ReferenceFeature;

public enum HttpStatus
{
    BadRequest = 400,
    Forbidden = 403,
    Ok = 200
}

public class HttpException(HttpStatus statusCode, object value) : Exception
{
    public int StatusCode { get; } = (int)statusCode;
    public object Value { get; } = value;
}

public class ExceptionFilter : IActionFilter, IOrderedFilter
{
    public int Order => int.MaxValue - 10;

    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception is HttpException httpException)
        {
            context.Result = new ObjectResult(httpException.Value) { StatusCode = httpException.StatusCode };
            context.ExceptionHandled = true;
        }
    }
}
