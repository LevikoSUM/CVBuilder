namespace CVBuilder.Models
{
    public class PersonalInformation
    {
        public int PersonalInformationId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public string EMail { get; set; }
        public int CVId { get; set; }
        public CV CV { get; set; }
    }
}
