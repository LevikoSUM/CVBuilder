namespace CVBuilder.Models
{
    public class Education
    {
        public int EducationId { get; set; }
        public string EducationName { get; set; }
        public string InstituteName { get; set; }
        public string EducationLevel { get; set; }
        public int CVId { get; set; }
        public CV CV { get; set; }
    }
}
