public static class EFCoreExtension
{
    public static IQueryable<T> Search<T>(
        IQueryable<T> source,
        string text,
        string[] properties
    )
    {
        //
        //  Summary:
        //      Search content with custom columns
        //
        //  Returns:
        //      Filter records
        //
        try
        {
            string predicate = string.Join(
                " OR ",
                properties.Select(property => $"{property}.Contains(@0)")
            );
            return source.Where(predicate, text);
        }
        //
        //  Summary:
        //      Default record if error handle
        //
        //  Returns:
        //
        //
        catch
        {
            return source;
        }
    }

    public static IQueryable<T> OrderBy<T>(
        IQueryable<T> source,
        string column,
        SortOrder sortOrder = SortOrder.DESC
    )
    {
        //
        //  Summary:
        //      Sort content with custom columns
        //
        //  Returns:
        //      Filter records
        //
        try
        {
            string typeOrder =
                sortOrder is SortOrder.DESC
                    ? nameof(SortOrder.DESC)
                    : nameof(SortOrder.ASC);

            return source.OrderBy($"{column} {typeOrder}");
        }
        //
        //  Summary:
        //      Default record if error handle
        //
        //  Returns:
        //
        //
        catch
        {
            return source;
        }
    }
}
