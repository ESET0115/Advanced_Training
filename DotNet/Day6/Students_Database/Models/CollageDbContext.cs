using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Students_Database.Models;

public partial class CollageDbContext : DbContext
{
    public CollageDbContext()
    {
    }

    public CollageDbContext(DbContextOptions<CollageDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Student> Students { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=CollageDB;Integrated Security=True;Encrypt=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(entity =>
        {
            entity.ToTable("students");

            entity.Property(e => e.StudentId).HasColumnName("studentId");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
