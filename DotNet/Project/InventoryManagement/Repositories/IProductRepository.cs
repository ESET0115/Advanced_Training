using InventoryManagement.Models;
using System.Collections.Generic;

namespace InventoryManagement.Repositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        IEnumerable<Product> GetProductsWithCategory();
        Product GetProductWithCategory(int productId);
        IEnumerable<Product> GetProductsByCategory(int categoryId);
        IEnumerable<Product> GetLowStockProducts(int threshold);
        IEnumerable<Product> GetProductsByPriceRange(decimal minPrice, decimal maxPrice);
        void UpdateStock(int productId, int newStockQuantity);
    }
}