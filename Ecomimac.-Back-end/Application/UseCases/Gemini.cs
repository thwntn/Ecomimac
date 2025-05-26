namespace ReferenceService;

public class GeminiService() : IGemini
{
    private readonly HttpClient _client = new();
    private readonly string _GeminiUrl = Environment.GetEnvironmentVariable(
        nameof(EnvironmentNames.GeminiUrl)
    );
    private readonly string _GeminiKey = Environment.GetEnvironmentVariable(
        nameof(EnvironmentNames.GeminiKey)
    );

    public async Task<IEnumerable<MGemini.Response.Text>> Chat(string input)
    {
        HttpRequestMessage message = new HttpRequestMessage(
            HttpMethod.Post,
            $"{_GeminiUrl}{_GeminiKey}"
        )
        {
            Content = new StringContent(
                Mapper.Serialize(new MGemini.Data(input)),
                Encoding.UTF8,
                "application/json"
            ),
        };
        HttpResponseMessage httpResponseMessage = await _client.SendAsync(
            message
        );
        string content = await httpResponseMessage.Content.ReadAsStringAsync();
        Logger.Json(content);

        MGemini.Response result = Mapper.Deserialize<MGemini.Response>(
            content
        );
        return result.candidates.FirstOrDefault().content.parts;
    }
}
