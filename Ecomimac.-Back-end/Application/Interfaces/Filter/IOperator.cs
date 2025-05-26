namespace ReferenceInterface;

public interface IOperator
{
    IEnumerable<FilterObject.Operator> Execute();
}
