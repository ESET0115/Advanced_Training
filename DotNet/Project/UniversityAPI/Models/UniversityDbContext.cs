using Microsoft.EntityFrameworkCore;

namespace UniversityAPI.Models
{
    public partial class UniversityDbContext : DbContext
    {
        public UniversityDbContext(DbContextOptions<UniversityDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure for existing database tables
            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course"); // Map to existing table name
                entity.HasKey(e => e.CourseId);
                entity.HasIndex(e => e.CourseCode).IsUnique();
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("Student"); // Map to existing table name
                entity.HasKey(e => e.StudentId);
                entity.HasIndex(e => e.RollNumber).IsUnique();
                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.CourseId);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("[User]"); // Use brackets if User is a reserved keyword
                entity.HasKey(e => e.UserId);
                entity.HasIndex(e => e.Username).IsUnique();
            });

            // Remove any partial method calls related to migrations
            // OnModelCreatingPartial(modelBuilder); // Comment out or remove this line
        }

        // Remove this partial method if it exists
        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}