namespace ReferenceService;

public class Operator : IOperator
{
    public IEnumerable<FilterObject.Operator> Execute()
    {
        string define = File.ReadAllText(
            $"{Directory.GetCurrentDirectory()}/Common/Metadata/Operator.json"
        );

        IEnumerable<FilterObject.Operator> conditions =
            Mapper.Deserialize<IEnumerable<FilterObject.Operator>>(
                define
            );

        return conditions;
    }
}
