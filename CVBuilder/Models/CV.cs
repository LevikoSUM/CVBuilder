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
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public int? Age { get; set; }
        public string? Phone { get; set; }
        public string? Jobtitle { get; set; }
        public string? Company { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Degree { get; set; }
        public string? University { get; set; }
        public int? GraduationYear { get; set; }
        public int? TemplateId { get; set; }
        public Template? Template { get; set; }
    }

}
