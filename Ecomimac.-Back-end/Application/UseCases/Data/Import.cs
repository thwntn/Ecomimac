using ExcelDataReader;

namespace ReferenceService;

public class ImportData(
    IImportRepository importRepository,
    IDataRepository dataRepository,
    IRealtimeData realtimeData
) : IImportData
{
    private readonly IImportRepository _importRepository = importRepository;
    private readonly IRealtimeData _realtimeData = realtimeData;
    private readonly IDataRepository _dataRepository = dataRepository;
    private readonly int PATH_SIZE = 10000;
    private readonly int PATH_SIZE_PREVIEW = 5;

    public string Execute(Guid profileId, Guid dataId, MemoryStream stream)
    {
        _dataRepository.ChangeStatus(profileId, dataId, DataStatus.IMPORT);

        //  Summary:
        //      Update import data
        //
        void Action(List<object> records, List<string> _) =>
            _importRepository.Create(
                records.Select(data => new Import(
                    dataId,
                    Mapper.Serialize(data)
                ))
            );

        List<string> schema = ReadExcel(stream, Action);

        //  Summary:
        //      Update data information
        //
        Data data = _dataRepository.GetById(dataId);
        data.Schema = Mapper.Serialize(schema);
        data.Status = DataStatus.DONE;

        //  Summary:
        //      Save schema data
        //
        _dataRepository.Update(data);
        _realtimeData.Execute(profileId);

        return MessageConstant.IMPORT_EXCEL_SUCCESS;
    }

    public List<string> ReadExcel(
        MemoryStream stream,
        Action<List<object>, List<string>> action,
        bool isPreview = false
    )
    {
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        using IExcelDataReader reader = ExcelReaderFactory.CreateReader(stream);

        int indexRow = 0;
        List<string> schema = [];
        List<object> records = [];

        do
        /// Loop rows on sheet
        while (reader.Read())
        {
            //  Summary:
            //      If preview -> break
            if (isPreview is true && indexRow > PATH_SIZE_PREVIEW)
                break;

            Dictionary<string, string> record = [];
            for (
                int indexColumn = 0;
                indexColumn < reader.FieldCount;
                indexColumn++
            )
            {
                object value = reader.GetValue(indexColumn);
                //  Summary:
                //      First row is schema
                //
                if (indexRow is 0)
                    schema.Add(
                        Format
                            .Default(Convert.ToString(value), string.Empty)
                            .ToLower()
                    );
                //  Summary:
                //      Around (second -> end) row is data
                //
                //  Returns:
                //
                else if (value.Justifiable())
                    record.TryAdd(schema[indexColumn], Convert.ToString(value));
            }

            indexRow++;
            if (record.Count is not 0)
                records.Add(record);

            //  Summary:
            //      If not enough patching -> continue
            //
            if (records.Count < PATH_SIZE)
                continue;

            action(records, schema);
            records.Clear();
        }
        /// Loop sheets
        while (reader.NextResult());

        //  Summary:
        //      Action call latest
        //
        if (records.Count > 0)
            action(records, schema);

        return schema;
    }
}
