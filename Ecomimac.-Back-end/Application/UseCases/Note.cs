namespace ReferenceService;

public class NoteService(DatabaseContext databaseContext, IJwt jwtService)
    : INote
{
    private readonly DatabaseContext _databaseContext = databaseContext;
    private readonly IJwt _jwtService = jwtService;

    public IEnumerable<Note> List(int status)
    {
        IOrderedQueryable<Note> notes = _databaseContext
            .Note.Where(note =>
                note.ProfileId == _jwtService.Information().ProfileId
                && (int)note.Status == status
            )
            .OrderByDescending(note => note.Created);

        return notes;
    }

    public Note Get(Guid noteId)
    {
        Note note =
            _databaseContext.Note.FirstOrDefault(note =>
                note.ProfileId == _jwtService.Information().ProfileId
                && note.Id == noteId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTE
            );

        return note;
    }

    public Note Create(NoteDataTransformer.Create create)
    {
        Note note = Mapper.Map<Note>(create);
        note.Created = Timebase.Now();
        note.ProfileId = _jwtService.Information().ProfileId;
        _databaseContext.Add(note);
        _databaseContext.SaveChanges();
        return note;
    }

    public Note UpdateContent(
        Guid noteId,
        NoteDataTransformer.UpdateContent updateContent
    )
    {
        Note note =
            _databaseContext.Note.FirstOrDefault(note =>
                note.ProfileId == _jwtService.Information().ProfileId
                && note.Id == noteId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTE
            );

        note.Content = updateContent.content;
        _databaseContext.Update(note);
        _databaseContext.SaveChanges();
        return note;
    }

    public Note Update(NoteDataTransformer.Update update)
    {
        bool exist = _databaseContext.Note.Any(note =>
            note.ProfileId == _jwtService.Information().ProfileId
            && note.Id == update.Id
        );
        if (exist is false)
            throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTE
            );

        Note note = Mapper.Map<Note>(update);
        _databaseContext.Update(note);
        _databaseContext.SaveChanges();
        return note;
    }

    public Note MoveToTrash(Guid noteId)
    {
        Note note =
            _databaseContext.Note.FirstOrDefault(note =>
                note.Id == noteId
                && note.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTE
            );

        note.Status = StatusNote.Remove;
        _databaseContext.Update(note);
        _databaseContext.SaveChanges();

        return note;
    }

    public Note Archive(Guid noteId)
    {
        Note note =
            _databaseContext.Note.FirstOrDefault(note =>
                note.Id == noteId
                && note.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTE
            );

        note.Status = StatusNote.Archive;
        _databaseContext.Update(note);
        _databaseContext.SaveChanges();

        return note;
    }

    public Note Restore(Guid noteId)
    {
        Note note =
            _databaseContext.Note.FirstOrDefault(note =>
                note.Id == noteId
                && note.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTE
            );

        note.Status = StatusNote.Default;
        _databaseContext.Update(note);
        _databaseContext.SaveChanges();

        return note;
    }

    public string Remove(Guid noteId)
    {
        Note note =
            _databaseContext.Note.FirstOrDefault(note =>
                note.Id == noteId
                && note.ProfileId == _jwtService.Information().ProfileId
            )
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_NOTE
            );

        _databaseContext.Remove(note);
        _databaseContext.SaveChanges();

        return string.Empty;
    }
}
