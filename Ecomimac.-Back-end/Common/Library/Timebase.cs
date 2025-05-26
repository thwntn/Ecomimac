namespace ReferenceFeature;

public class Timebase
{
    //
    // Summary:
    //      Format datetime without time
    //
    //
    //
    public const string FORMAT_DATE_WITHOUT_TIME = "YYYY-MM-DD";

    //
    // Summary:
    //      Number day of week
    //
    //
    //
    public const int WEEK = 7;

    //
    // Summary:
    //      Information timezone in system
    //
    //
    //
    private static readonly TimeZoneInfo _timeZoneInfo =
        TimeZoneInfo.FindSystemTimeZoneById(
            Environment.GetEnvironmentVariable(
                nameof(EnvironmentNames.TimeZone)
            )
        );

    public static DateTime Now() =>
        TimeZoneInfo.ConvertTime(DateTime.Now, _timeZoneInfo);

    public static IEnumerable<string> ListTimeZoneId()
    {
        IEnumerable<string> systemTimeZones = TimeZoneInfo
            .GetSystemTimeZones()
            .Select(timeZoneInfo => timeZoneInfo.Id);
        return systemTimeZones;
    }

    public static (DateTime, DateTime) RangeTimeMonth(DateTime dateTime)
    {
        int prefix = 1;
        DateTime minDate = new(dateTime.Year, dateTime.Month, prefix);
        DateTime maxDate = new DateTime(
            dateTime.Year,
            dateTime.Month + prefix,
            prefix
        ).AddDays(-prefix);
        return (minDate, maxDate);
    }
}
