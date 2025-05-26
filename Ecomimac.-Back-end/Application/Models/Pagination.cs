namespace ReferenceModel;

public enum SortOrder
{
    ASC,
    DESC,
}

public class Pagination<T>
{
    private const int NONE = 0;
    private const int DEFAULT = 1;
    private const string PREFIXCacheSPLIT = ",";

    public Pagination(IQueryable<T> data, QueryOptions queryOptions)
    {
        if (data.Justifiable() is false)
            return;
        // Summary:
        //      Response record without pagination & search content
        if (
            queryOptions.SearchColumns.Justifiable()
            && queryOptions.SearchText.Justifiable()
            ///
            && queryOptions.SearchColumns.CompareTo(string.Empty) is not 0
            && queryOptions.SearchText.CompareTo(string.Empty) is not 0
        )
            Cache = EFCoreExtension.Search(
                data,
                queryOptions.SearchText,
                queryOptions.SearchColumns.Split(PREFIXCacheSPLIT)
            );
        else
            Cache = data;
        // Summary:
        //      Sort records
        if (
            queryOptions.SortColumn.Justifiable()
            && queryOptions.SortOrder.Justifiable()
            ///
            && queryOptions.SortColumn.CompareTo(string.Empty) is not 0
        )
            Cache = EFCoreExtension.OrderBy(
                Cache.AsQueryable(),
                queryOptions.SortColumn,
                queryOptions.SortOrder
            );
        // Summary:
        //      Response record without pagination
        if (queryOptions.Limit is not NONE && queryOptions.Page is not NONE)
            Cache = Cache
                .Skip((queryOptions.Page - DEFAULT) * queryOptions.Limit)
                .Take(queryOptions.Limit);

        // Summary:
        //      Configure metadata
        Page = new(data.Count(), queryOptions.Limit, queryOptions.Page);
    }

    // Summary:
    //      Cache query
    private IEnumerable<T> Cache { get; set; }

    // Summary:
    //      Result records
    public List<T> Data
    {
        get => [.. Cache];
        set => Cache = value;
    }

    // Summary:
    //      Metadata
    public Page Page { get; set; }
}

public class Page
{
    private const int NONE = 0;
    private const int DEFAULT = 1;

    public Page(int quantity, int limit, int current)
    {
        // Summary:
        //      Void data if not pagination
        if (quantity == NONE || limit == NONE || current == NONE)
            return;

        // Summary:
        //      Configure metadata
        Total = Math.Max((int)Math.Ceiling(quantity / (double)limit), DEFAULT);
        Current = current;
        Limit = limit;
    }

    // Summary:
    //      Total record in database
    public int Total { get; set; } = NONE;

    // Summary:
    //      Limit record per page
    public int Limit { get; set; } = NONE;

    // Summary:
    //      Current page
    public int Current { get; set; } = NONE;
}

public class PageResponse
{
    // Summary:
    //      Total record in database
    public int Total { get; set; }

    // Summary:
    //      Limit record per page
    public int Limit { get; set; }

    // Summary:
    //      Current page
    public int Current { get; set; }
}

public class PaginationResponse<TResponse>
{
    public List<TResponse> Data { get; set; }
    public PageResponse Page { get; set; }
}
