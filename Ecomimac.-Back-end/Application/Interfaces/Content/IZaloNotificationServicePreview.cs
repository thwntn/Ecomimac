namespace ReferenceInterface;

public interface IZaloNotificationServicePreview
{
    Task<string> Execute(string templateId);
}
