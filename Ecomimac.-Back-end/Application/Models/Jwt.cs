namespace ReferenceModel;

public class Information
{
    public Guid ProfileId { get; set; }
    public Guid AccountId { get; set; }
    public Guid ParentId { get; set; }
    public string Role { get; set; }
    public int Nbf { get; set; }
    public int Exp { get; set; }
    public int Iat { get; set; }
    public string Iss { get; set; }
    public string Aud { get; set; }
}
