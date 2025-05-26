namespace ReferenceInterface;

public interface IRepository<TEntity>
    where TEntity : class
{
    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    DbSet<TEntity> Raw();

    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    TEntity GetById(Guid id);

    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    IQueryable<TEntity> GetByCondition(
        Expression<Func<TEntity, bool>> predicate
    );

    //
    // Summary:
    //      Join table
    //
    // Returns:
    //
    IIncludableQueryable<TEntity, Property> Include<Property>(
        Expression<Func<TEntity, Property>> execution
    );

    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    IQueryable<TEntity> List();

    //
    // Summary:
    //      Create standard response
    //
    // Returns:
    //
    TEntity Create(TEntity entity);

    //
    // Summary:
    //      Create standard response
    //
    // Returns:
    //
    IEnumerable<TEntity> Create(IEnumerable<TEntity> entities);

    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    TEntity Update(TEntity entity);

    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    IEnumerable<TEntity> Update(IEnumerable<TEntity> entities);

    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    string Remove(TEntity entity);

    //
    // Summary:
    //      Get record by id standard response
    //
    // Returns:
    //
    string SoftRemove(TEntity softRemove, Guid profileId);

    //
    // Summary:
    //      Get context database
    //
    // Returns:
    //
    DatabaseContext AsDatabaseContext();
}
