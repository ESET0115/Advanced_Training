using Microsoft.EntityFrameworkCore;
using InventoryManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace InventoryManagement.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<Product> GetProductsWithCategory()
        {
            return _context.Products
                .Include(p => p.Category)
                .ToList();
        }

        public Product GetProductWithCategory(int productId)
        {
            return _context.Products
                .Include(p => p.Category)
                .FirstOrDefault(p => p.ProductId == productId);
        }

        public IEnumerable<Product> GetProductsByCategory(int categoryId)
        {
            return _context.Products
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId)
                .ToList();
        }

        public IEnumerable<Product> GetLowStockProducts(int threshold)
        {
            return _context.Products
                .Include(p => p.Category)
                .Where(p => p.StockQuantity <= threshold)
                .ToList();
        }

        public IEnumerable<Product> GetProductsByPriceRange(decimal minPrice, decimal maxPrice)
        {
            return _context.Products
                .Include(p => p.Category)
                .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                .ToList();
        }

        public void UpdateStock(int productId, int newStockQuantity)
        {
            var product = _context.Products.Find(productId);
            if (product != null)
            {
                product.StockQuantity = newStockQuantity;
                _context.SaveChanges();
            }
        }
    }
}