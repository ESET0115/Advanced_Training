using InventoryManagement.DTOs;
using System.Collections.Generic;

namespace InventoryManagement.DTOs
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public int ProductCount { get; set; }
    }

    public class CategoryWithProductsDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }

    public class CreateCategoryDto
    {
        public string CategoryName { get; set; } = string.Empty;
    }

    public class UpdateCategoryDto
    {
        public string CategoryName { get; set; } = string.Empty;
    }
}