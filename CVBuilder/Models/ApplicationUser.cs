using Microsoft.AspNetCore.Identity;

namespace CVBuilder.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Nickname { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }
}
