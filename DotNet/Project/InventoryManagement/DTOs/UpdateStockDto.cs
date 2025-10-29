using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.DTOs
{
    public class UpdateStockDto
    {
        [Required(ErrorMessage = "Stock quantity is required")]
        [Range(0, int.MaxValue, ErrorMessage = "Stock quantity cannot be negative")]
        public int StockQuantity { get; set; }
    }
}