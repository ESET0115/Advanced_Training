using InventoryManagement.Models;
using System.Collections.Generic;

namespace InventoryManagement.Repositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        IEnumerable<Category> GetCategoriesWithProducts();
        Category GetCategoryWithProducts(int categoryId);
        bool CategoryExists(int categoryId);
        bool CategoryNameExists(string categoryName);
    }
}