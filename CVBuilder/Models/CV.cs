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
        public ICollection<Experience>? Experiences { get; set;}
        public ICollection<Education>? Educations { get; set;}
        public int? PersonalInformationId { get; set; }
        public PersonalInformation? PersonalInformation { get; set; }
    }

}
