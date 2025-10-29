using Microsoft.EntityFrameworkCore;
using InventoryManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace InventoryManagement.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<Category> GetCategoriesWithProducts()
        {
            return _context.Categories
                .Include(c => c.Products)
                .ToList();
        }

        public Category GetCategoryWithProducts(int categoryId)
        {
            return _context.Categories
                .Include(c => c.Products)
                .FirstOrDefault(c => c.CategoryId == categoryId);
        }

        public bool CategoryExists(int categoryId)
        {
            return _context.Categories.Any(c => c.CategoryId == categoryId);
        }

        public bool CategoryNameExists(string categoryName)
        {
            return _context.Categories.Any(c => c.CategoryName.ToLower() == categoryName.ToLower());
        }
    }
}