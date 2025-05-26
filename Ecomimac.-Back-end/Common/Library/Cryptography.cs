using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace ReferenceFeature;

public class Cryptography
{
    private static readonly Random _random = new();

    public static Guid RandomGuid() => Guid.NewGuid();

    public static string Md5(string str) =>
        BitConverter
            .ToString(MD5.HashData(Encoding.UTF8.GetBytes(str)))
            .Replace("-", "");

    public static string Base64UrlEncode(string input) =>
        Convert
            .ToBase64String(Encoding.UTF8.GetBytes(input))
            .Replace("+", "-")
            .Replace("/", "_")
            .Replace("=", "");

    public static string RandomCode() =>
        string.Format("{0:X}", Timebase.Now().GetHashCode());

    public static string Hash(string content)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
        string hashed = Convert.ToBase64String(
            KeyDerivation.Pbkdf2(
                password: content,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8
            )
        );
        return hashed;
    }

    public static string HmacSha256(string content, string privateKey)
    {
        try
        {
            string message = content
                .Replace(System.Environment.NewLine, string.Empty)
                .Replace(" ", "");
            byte[] bytes = Encoding.Default.GetBytes(message);
            byte[] key = Encoding.Default.GetBytes(privateKey);
            HMACSHA512 hMACSHA512 = new(key);
            byte[] computeHash = hMACSHA512.ComputeHash(bytes);
            string hash = BitConverter.ToString(computeHash).Replace("-", "");
            return hash;
        }
        catch (IOException exception)
        {
            Logger.Log(exception);
            return string.Empty;
        }
    }
}
