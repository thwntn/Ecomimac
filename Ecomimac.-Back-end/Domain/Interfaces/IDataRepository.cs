namespace ReferenceRepository;

public interface IDataRepository : IRepository<Data>
{
    Data ChangeStatus(Guid profileId, Guid dataId, DataStatus status);
}
