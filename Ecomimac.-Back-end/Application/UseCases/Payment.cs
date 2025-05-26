namespace ReferenceService;

public class PaymentService() : IPayment
{
    public PaymentObject.Payment Information(PaymentMethod key)
    {
        PaymentObject.Payment payment =
            List().FirstOrDefault(payment => payment.Key == key)
            ?? throw new HttpException(
                HttpStatus.BadRequest,
                MessageConstant.NOT_FOUND_PAYMENT
            );

        return payment;
    }

    public IEnumerable<PaymentObject.Payment> List()
    {
        string define = File.ReadAllText(
            $"{Directory.GetCurrentDirectory()}/Common/Metadata/Payment.json"
        );

        IEnumerable<PaymentObject.Payment> payments =
            Mapper.Deserialize<IEnumerable<PaymentObject.Payment>>(
                define
            );

        return payments;
    }
}
