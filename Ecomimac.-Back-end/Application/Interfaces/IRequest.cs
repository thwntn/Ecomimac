namespace ReferenceService;

public interface IRequest
{
    Task<string> Get(
        string uri,
        Dictionary<string, string> queries,
        Dictionary<string, string> headers
    );
    Task<TResult> Json<TResult>(
        string url,
        Dictionary<string, object> data,
        Dictionary<string, string>? headers
    );
    Task<TResult> FormUrlEncoded<TResult>(
        string url,
        FormUrlEncodedContent formUrlEncodedContent,
        Dictionary<string, string>? headers
    );
}
