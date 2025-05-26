namespace ReferenceRepository;

public class Repository<TEntity>(DatabaseContext databaseContext)
    where TEntity : class, IEntity
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly DbSet<TEntity> _databaseSet =
        databaseContext.Set<TEntity>();

    public DbSet<TEntity> Raw()
    {
        return _databaseSet;
    }

    public TEntity GetById(Guid id)
    {
        TEntity record =
            _databaseSet.FirstOrDefault(entity => entity.Id == id)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_ID
            );
        return record;
    }

    public IQueryable<TEntity> GetByCondition(
        Expression<Func<TEntity, bool>> predicate
    )
    {
        IQueryable<TEntity> records = _databaseSet.Where(predicate);
        return records;
    }

    public IQueryable<TEntity> List()
    {
        IQueryable<TEntity> records = _databaseSet.AsQueryable();
        return records;
    }

    public TEntity Create(TEntity entity)
    {
        _databaseSet.Add(entity);
        _databaseContext.SaveChanges();

        return entity;
    }

    public IEnumerable<TEntity> Create(IEnumerable<TEntity> entities)
    {
        _databaseSet.AddRange(entities);
        _databaseContext.SaveChanges();

        return entities;
    }

    public TEntity Update(TEntity entity)
    {
        _databaseSet.Update(entity);
        _databaseContext.SaveChanges();

        _databaseContext.ChangeTracker.Clear();
        return entity;
    }

    public IEnumerable<TEntity> Update(IEnumerable<TEntity> entities)
    {
        _databaseSet.UpdateRange(entities);
        _databaseContext.SaveChanges();

        _databaseContext.ChangeTracker.Clear();
        return entities;
    }

    public string Remove(TEntity entity)
    {
        _databaseSet.Remove(entity);
        _databaseContext.SaveChanges();

        return string.Empty;
    }

    public string SoftRemove(TEntity softRemove, Guid profileId)
    {
        softRemove.Deleted = Timebase.Now();
        softRemove.DeleteBy = profileId;

        _databaseContext.Update(softRemove);
        _databaseContext.SaveChanges();

        return string.Empty;
    }

    public IIncludableQueryable<TEntity, P> Include<P>(
        Expression<Func<TEntity, P>> navigationPropertyPath
    ) => _databaseSet.Include(navigationPropertyPath);

    public DatabaseContext AsDatabaseContext() => _databaseContext;
}
