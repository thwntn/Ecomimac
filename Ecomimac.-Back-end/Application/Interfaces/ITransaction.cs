namespace ReferenceInterface;

public interface ITransaction
{
    string Payment(string name);
    Dictionary<string, TransactionObject.Package> Package();
    Setting Config(string name, TransactionObject.Package package);
    Task<TransactionObject.MessageResponse> Verify(
        TransactionDataTransformer.SepayRequest sepayRequest
    );
}
