namespace ReferenceInterface;

public interface INote
{
    IEnumerable<Note> List(int status);
    Note Get(Guid noteId);
    Note Create(NoteDataTransformer.Create create);
    Note Update(NoteDataTransformer.Update update);
    string Remove(Guid noteId);
    Note MoveToTrash(Guid noteId);
    Note Restore(Guid noteId);
    Note Archive(Guid noteId);
    Note UpdateContent(
        Guid noteId,
        NoteDataTransformer.UpdateContent updateContent
    );
}
