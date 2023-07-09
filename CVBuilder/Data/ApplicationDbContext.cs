using CVBuilder.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CVBuilder.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<CV> CVs { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<PersonalInformation> PersonalInformations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CV>()
                .HasOne(c => c.User)
                .WithMany(u => u.CVs)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CV>()
                .HasOne(cv => cv.PersonalInformation)
                .WithOne(pi => pi.CV)
                .HasForeignKey<PersonalInformation>(pi => pi.CVId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CV>()
                .HasMany(cv => cv.Educations)
                .WithOne(e => e.CV)
                .HasForeignKey(e => e.CVId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CV>()
                .HasMany(cv => cv.Experiences)
                .WithOne(e => e.CV)
                .HasForeignKey(e => e.CVId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}