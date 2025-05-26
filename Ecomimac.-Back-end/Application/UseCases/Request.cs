namespace ReferenceService;

public class RequestService : IRequest
{
    private readonly string[] CHARACTER = ["&", "", "="];

    private string WithParams(string uri, Dictionary<string, string> queries)
    {
        if (queries.Justifiable() is false || queries.Count is 0)
            return uri;

        //  Summary:
        //      Request & deserialize data response
        string mapper = string.Join(
            CHARACTER[0],
            queries.Select(query => query.Key + CHARACTER[2] + query.Value)
        );

        return uri + CHARACTER[1] + mapper;
    }

    public async Task<string> Get(
        string uri,
        Dictionary<string, string> queries,
        Dictionary<string, string> headers
    )
    {
        HttpClient _ = new();

        //  Summary:
        //      Add headers request
        if (headers.Justifiable())
            foreach (KeyValuePair<string, string> item in headers)
                _.DefaultRequestHeaders.Add(item.Key, item.Value);

        //  Summary:
        //      Request & deserialize data response
        string hostname = WithParams(uri, queries);
        string content = await _.GetStringAsync(hostname);

        return content;
    }

    public async Task<TResult> Json<TResult>(
        string uri,
        Dictionary<string, object> data,
        Dictionary<string, string> headers
    )
    {
        //  Summary:
        //      Prepare client & request pathname
        HttpClient _ = new();

        //  Summary:
        //      Add headers request
        if (headers.Justifiable())
            foreach (KeyValuePair<string, string> item in headers)
                _.DefaultRequestHeaders.Add(item.Key, item.Value);

        //  Summary:
        //      Request & deserialize data response
        HttpResponseMessage httpResponseMessage = await _.PostAsJsonAsync(
            uri,
            data
        );

        string content = await httpResponseMessage.Content.ReadAsStringAsync();
        if (
            httpResponseMessage.StatusCode
            is HttpStatusCode.OK
                or HttpStatusCode.Created
        )
            return Mapper.Deserialize<TResult>(content);

        //  Summary:
        //      Handle error & print error
        return default;
    }

    public async Task<TResult> FormUrlEncoded<TResult>(
        string uri,
        FormUrlEncodedContent formUrlEncodedContent,
        Dictionary<string, string> headers
    )
    {
        //  Summary:
        //      Prepare client & request pathname
        HttpClient _ = new();

        //  Summary:
        //      Add headers request
        if (headers.Justifiable())
            foreach (KeyValuePair<string, string> item in headers)
                _.DefaultRequestHeaders.Add(item.Key, item.Value);

        //  Summary:
        //      Request & deserialize data response
        HttpResponseMessage httpResponseMessage = await _.PostAsync(
            uri,
            formUrlEncodedContent
        );

        string content = await httpResponseMessage.Content.ReadAsStringAsync();
        if (
            httpResponseMessage.StatusCode
            is HttpStatusCode.OK
                or HttpStatusCode.Created
        )
            return Mapper.Deserialize<TResult>(content);

        //  Summary:
        //      Handle error & print error
        return default;
    }
}
