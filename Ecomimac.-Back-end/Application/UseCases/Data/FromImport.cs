namespace ReferenceService;

public class FromImport(IImportRepository importRepository) : IFromImport
{
    private readonly IImportRepository _importRepository = importRepository;

    public Pagination<Import> Execute(
        Data data,
        QueryOptions queryOptions
    )
    {
        DbSet<Import> importDbSet = _importRepository.Raw();
        string str = $@"SELECT * FROM ""Import"" WHERE {Condition(data)}";

        //
        //  Summary:
        //      Query execute
        //
        //  Returns:
        //      Records import with pagination
        //
        int offset = (queryOptions.Page - 1) * queryOptions.Limit;
        int counter = importDbSet.FromSqlRaw(str).Count();

        IEnumerable<Import> imports = importDbSet
            .FromSqlRaw(str)
            .OrderBy(import => import.Created)
            .Skip(offset)
            .Take(queryOptions.Limit);

        return new(default, default)
        {
            Data = [.. imports],
            Page = new(counter, queryOptions.Limit, queryOptions.Page),
        };
    }

    private static string Condition(Data data)
    {
        string str = string.Empty;

        foreach (Filter filter in data.Filters)
        {
            string column = filter.Column;
            string @operator = Operator(filter.Operator);
            string value = filter.Value;

            str = Format.ConcatSpace(
                str,
                $@"(""JsonRecord""::jsonb)->>'{column}' {@operator} '{value}' AND"
            );
        }

        str = Format.ConcatSpace(str, $@"""DataId"" = '{data.Id}'");
        return str;
    }

    private static string Operator(Condition condition)
    {
        string[] @case = ["=", "!=", ">", "<"];
        return @case[(int)condition];
    }
}
