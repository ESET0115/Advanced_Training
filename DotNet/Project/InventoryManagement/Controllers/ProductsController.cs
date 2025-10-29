using Microsoft.AspNetCore.Mvc;
using InventoryManagement.DTOs;
using InventoryManagement.Models;
using InventoryManagement.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InventoryManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ProductsController(IProductRepository productRepository, ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        // GET: api/products
        [HttpGet]
        public ActionResult<IEnumerable<ProductDto>> GetProducts()
        {
            try
            {
                var products = _productRepository.GetProductsWithCategory();
                var productDtos = products.Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category?.CategoryName ?? "Unknown"
                }).ToList();

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public ActionResult<ProductDto> GetProduct(int id)
        {
            try
            {
                var product = _productRepository.GetProductWithCategory(id);
                if (product == null)
                {
                    return NotFound();
                }

                var productDto = new ProductDto
                {
                    ProductId = product.ProductId,
                    ProductName = product.ProductName,
                    Price = product.Price,
                    StockQuantity = product.StockQuantity,
                    CategoryId = product.CategoryId,
                    CategoryName = product.Category?.CategoryName ?? "Unknown"
                };

                return Ok(productDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/products/by-category/5
        [HttpGet("by-category/{categoryId}")]
        public ActionResult<IEnumerable<ProductDto>> GetProductsByCategory(int categoryId)
        {
            try
            {
                if (!_categoryRepository.CategoryExists(categoryId))
                {
                    return NotFound("Category not found.");
                }

                var products = _productRepository.GetProductsByCategory(categoryId);
                var productDtos = products.Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category?.CategoryName ?? "Unknown"
                }).ToList();

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/products/low-stock
        [HttpGet("low-stock")]
        public ActionResult<IEnumerable<ProductDto>> GetLowStockProducts([FromQuery] int threshold = 10)
        {
            try
            {
                var products = _productRepository.GetLowStockProducts(threshold);
                var productDtos = products.Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category?.CategoryName ?? "Unknown"
                }).ToList();

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/products/price-range
        [HttpGet("price-range")]
        public ActionResult<IEnumerable<ProductDto>> GetProductsByPriceRange([FromQuery] decimal minPrice = 0, [FromQuery] decimal maxPrice = 1000)
        {
            try
            {
                var products = _productRepository.GetProductsByPriceRange(minPrice, maxPrice);
                var productDtos = products.Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    StockQuantity = p.StockQuantity,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category?.CategoryName ?? "Unknown"
                }).ToList();

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/products
        [HttpPost]
        public ActionResult<ProductDto> CreateProduct(CreateProductDto createProductDto)
        {
            // Validation is automatically handled by DataAnnotations
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map DTO to Entity
            var product = new Product
            {
                ProductName = createProductDto.ProductName,
                Price = createProductDto.Price,
                StockQuantity = createProductDto.StockQuantity,
                CategoryId = createProductDto.CategoryId
            };

            _productRepository.Add(product);
            _productRepository.Save();

            // Map Entity to DTO for response
            var productDto = new ProductDto
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.CategoryName ?? "Unknown"
            };

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, productDto);
        }

        // PUT: api/products/5
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, UpdateProductDto updateProductDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = _productRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

            // Only update allowed fields
            product.ProductName = updateProductDto.ProductName;
            product.Price = updateProductDto.Price;
            product.StockQuantity = updateProductDto.StockQuantity;
            product.CategoryId = updateProductDto.CategoryId;

            _productRepository.Update(product);
            _productRepository.Save();

            return NoContent();
        }

        // PATCH: api/products/5/stock
        [HttpPatch("{id}/stock")]
        public IActionResult UpdateStock(int id, UpdateStockDto updateStockDto)
        {
            try
            {
                if (updateStockDto.StockQuantity < 0)
                {
                    return BadRequest("Stock quantity cannot be negative.");
                }

                var product = _productRepository.GetById(id);
                if (product == null)
                {
                    return NotFound();
                }

                _productRepository.UpdateStock(id, updateStockDto.StockQuantity);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = _productRepository.GetById(id);
                if (product == null)
                {
                    return NotFound();
                }

                _productRepository.Delete(id);
                _productRepository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}