namespace ReferenceService;

public class CacheService(IMemoryCache memoryCache) : ICache
{
    private readonly IMemoryCache _memoryCache = memoryCache;

    public TFormat Get<TFormat>(string name)
    {
        try
        {
            string json = _memoryCache.Get<string>(name);
            if (json == null)
                return default;

            TFormat cache = Mapper.Deserialize<TFormat>(json);
            return cache;
        }
        catch (Exception exception)
        {
            Logger.Log(exception);
            return default;
        }
    }

    public TFormat Cache<TFormat>(string name, Func<TFormat> handler)
    {
        TFormat data = handler();

        TFormat cache = Get<TFormat>(name);
        if (cache.Justifiable())
            return cache;

        MemoryCacheEntryOptions options = new()
        {
            AbsoluteExpiration = Timebase.Now().AddMinutes(60),
        };
        _memoryCache.Set(name, Mapper.Serialize(data), options);
        return data;
    }

    public void Update<TFormat>(string name, TFormat data)
    {
        _memoryCache.Set(name, Mapper.Serialize(data));
    }

    public void Reset(string name)
    {
        _memoryCache.Remove(name);
    }
}
