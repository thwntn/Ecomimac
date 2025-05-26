namespace ReferenceInterface;

public interface IDashboard
{
    Dashboard.ExpenditureResponse Expenditure(Guid profileId);
}
