namespace ReferenceInterface;

public interface ICache
{
    TFormat Get<TFormat>(string name);
    TFormat Cache<TFormat>(string name, Func<TFormat> func);
    void Update<TFormat>(string name, TFormat data);
    void Reset(string name);
}
