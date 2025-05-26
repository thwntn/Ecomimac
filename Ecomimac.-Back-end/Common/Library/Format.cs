using System.Globalization;
using System.Text.RegularExpressions;

namespace ReferenceFeature;

public class Format
{
    public static string UpperFirstLetter(string input)
    {
        if (input.Length is 0)
            return input;

        return string.Concat(input[0].ToString().ToUpper(), input.AsSpan(1));
    }

    public static IEnumerable<IEnumerable<T>> Patch<T>(
        IEnumerable<T> source,
        int size
    )
    {
        return source
            .Select((value, index) => new { value, index })
            .GroupBy(select => select.index / size)
            .Select(group => group.Select(select => select.value));
    }

    public static TFormat Default<TFormat>(TFormat? verify, TFormat replace) =>
        verify ?? replace;

    public static string CurrencyDefault(long quantity)
    {
        CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN"); // try with "en-US"
        string str =
            double.Parse(quantity.ToString())
                .ToString("#,###", cul.NumberFormat) + " đ";
        return str;
    }

    public static string ToConstant(string text)
    {
        string convert = string.Empty;
        for (int index = 0; index < text.Length; index++)
        {
            char character = text[index];
            if (char.IsUpper(character) && index > 0)
                convert += "_" + character;
            else
                convert += character;
        }
        return convert.ToUpper();
    }

    public static string ConcatSpace(params string[] values) =>
        $" {string.Join(" ", values)} ";

    public static string ConcatPathName(params string[] values) =>
        string.Join("/", values);

    public static long LimitZero(long number) => number >= 0 ? number : 0;

    public static string ToSimpleText(string text) =>
        Regex.Replace(text, @"\r?\n", string.Empty);
}
