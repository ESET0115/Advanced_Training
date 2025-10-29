using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace InventoryManagement.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Category entity
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CategoryId);
                entity.Property(e => e.CategoryName)
                      .IsRequired()
                      .HasMaxLength(100);
            });

            // Configure Product entity
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.ProductId);
                entity.Property(e => e.ProductName)
                      .IsRequired()
                      .HasMaxLength(150);
                entity.Property(e => e.Price)
                      .IsRequired()
                      .HasColumnType("decimal(10,2)");
                entity.Property(e => e.StockQuantity)
                      .IsRequired();

                // Configure relationship
                entity.HasOne(p => p.Category)
                      .WithMany(c => c.Products)
                      .HasForeignKey(p => p.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Seed initial data
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Electronics" },
                new Category { CategoryId = 2, CategoryName = "Clothing" },
                new Category { CategoryId = 3, CategoryName = "Books" }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, ProductName = "Laptop", Price = 999.99m, StockQuantity = 10, CategoryId = 1 },
                new Product { ProductId = 2, ProductName = "T-Shirt", Price = 19.99m, StockQuantity = 50, CategoryId = 2 },
                new Product { ProductId = 3, ProductName = "Programming Book", Price = 49.99m, StockQuantity = 25, CategoryId = 3 }
            );
        }
    }
}