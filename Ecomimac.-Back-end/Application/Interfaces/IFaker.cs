namespace ReferenceInterface;

public interface IFaker
{
    string Expense(Guid profileId);
    string Customer(Guid profileId);
    string Product(Guid profileId);
    string Discount(Guid profileId);
    string ExpenseTransaction(Guid categoryId);
}
