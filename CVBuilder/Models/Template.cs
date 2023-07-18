namespace CVBuilder.Models
{
    public class Template
    {
        public int TemplateId { get; set; }
        public string TemplateName { get; set; }
        public string? Url { get; set; }
        public ICollection<CV> CVs { get; set; }
    }
}
