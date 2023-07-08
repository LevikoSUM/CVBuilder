namespace CVBuilder.Models
{
    public class Experience
    {
        public int ExperienceId { get; set; }
        public string CompanyName { get; set; }
        public string Position { get; set;}
        public DateTime StartDate { get; set;}
        public DateTime EndDate { get; set;}
        public string Responsibility { get; set;}
        public string Achievement { get; set; }
    }
}
