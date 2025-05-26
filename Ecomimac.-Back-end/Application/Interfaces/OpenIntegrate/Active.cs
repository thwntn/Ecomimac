namespace ReferenceInterface;

public interface IActiveOpenIntegrationSession
{
    Task<OpenIntegrateSession> Execute(string openIntegrateSessionId);
}
