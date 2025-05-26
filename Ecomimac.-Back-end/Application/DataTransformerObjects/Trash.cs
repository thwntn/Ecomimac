namespace ReferenceDataTransformer;

public class TrashDataTransformer
{
    public class Add
    {
        public Guid StorageId { get; set; }
    }

    public class Restore : Add { }
}
