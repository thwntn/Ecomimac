using System.Text.RegularExpressions;

namespace ReferenceFeature;

public partial class Validate
{
    public static bool Email(string email) =>
        RegexValidateEmail().IsMatch(email);

    [GeneratedRegex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]
    private static partial Regex RegexValidateEmail();
}
