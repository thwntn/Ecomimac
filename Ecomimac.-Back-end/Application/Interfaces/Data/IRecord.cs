namespace ReferenceInterface;

public interface IRecordData
{
    Pagination<Import> Execute(
        Guid profileId,
        Guid dataId,
        QueryOptions queryOptions
    );
}
