namespace ReferenceDataTransformer;

public class QueryOptions
{
    //
    //  Summary:
    //      Limit record per page
    //
    //  Returns:
    //
    public int Limit { get; set; } = 0;

    //
    //  Summary:
    //      Current page in pagination
    //
    //  Returns:
    //
    public int Page { get; set; } = 0;

    //
    //  Summary:
    //      Columns in table search text
    //
    //  Returns:
    //
    public string SearchColumns { get; set; } = string.Empty;

    //
    //  Summary:
    //      Content search
    //
    //  Returns:
    //
    public string SearchText { get; set; } = string.Empty;

    //
    //  Summary:
    //      Sort by custom column
    //
    //  Returns:
    //
    public string SortColumn { get; set; } = string.Empty;

    //
    //  Summary:
    //      Sort by custom column
    //
    //  Returns:
    //
    public SortOrder SortOrder { get; set; } = SortOrder.DESC;
}
