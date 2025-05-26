namespace ReferenceInterface;

public interface IPayment
{
    IEnumerable<PaymentObject.Payment> List();
    PaymentObject.Payment Information(PaymentMethod key);
}
