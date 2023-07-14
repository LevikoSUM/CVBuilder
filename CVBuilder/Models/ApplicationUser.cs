using Microsoft.AspNetCore.Identity;

namespace CVBuilder.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() 
        {
        }
        public string? Nickname { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public ICollection<CV> CVs { get; set; }

    }
}
