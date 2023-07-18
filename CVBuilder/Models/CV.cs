using CVBuilder.Data;
using Microsoft.EntityFrameworkCore;

namespace CVBuilder.Models
{
    public class CV
    {
        public int CVId { get; set; }
        public string Name { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public int? Age { get; set; }
        public string? PhoneNumber { get; set; }
        public string? EMail { get; set; }
        public string? EducationName { get; set; }
        public string? InstituteName { get; set; }
        public string? EducationLevel { get; set; }
        public string? CompanyName { get; set; }
        public string? Position { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Responsibility { get; set; }
        public string? Achievement { get; set; }
        public int? TemplateId { get; set; }
        public Template? Template { get; set; }
    }

}
