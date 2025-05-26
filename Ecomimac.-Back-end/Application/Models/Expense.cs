namespace ReferenceModel;

public class ExpenseObject
{
    public class Banner(long used, long totalCost, long usable, long budget)
    {
        public long Used { get; set; } = used;
        public long TotalCost { get; set; } = totalCost;
        public long Usable { get; set; } = usable;
        public long Budget { get; set; } = budget;
    }
}
