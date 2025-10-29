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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/categories
        [HttpGet]
        public ActionResult<IEnumerable<CategoryDto>> GetCategories()
        {
            try
            {
                var categories = _categoryRepository.GetAll();
                var categoryDtos = categories.Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                    ProductCount = c.Products?.Count ?? 0
                }).ToList();

                return Ok(categoryDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/categories/with-products
        [HttpGet("with-products")]
        public ActionResult<IEnumerable<CategoryWithProductsDto>> GetCategoriesWithProducts()
        {
            try
            {
                var categories = _categoryRepository.GetCategoriesWithProducts();
                var categoryDtos = categories.Select(c => new CategoryWithProductsDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                    Products = c.Products?.Select(p => new ProductDto
                    {
                        ProductId = p.ProductId,
                        ProductName = p.ProductName,
                        Price = p.Price,
                        StockQuantity = p.StockQuantity,
                        CategoryId = p.CategoryId,
                        CategoryName = c.CategoryName
                    }).ToList() ?? new List<ProductDto>()
                }).ToList();

                return Ok(categoryDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public ActionResult<CategoryDto> GetCategory(int id)
        {
            try
            {
                var category = _categoryRepository.GetById(id);
                if (category == null)
                {
                    return NotFound();
                }

                var categoryDto = new CategoryDto
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName,
                    ProductCount = category.Products?.Count ?? 0
                };

                return Ok(categoryDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/categories/5/with-products
        [HttpGet("{id}/with-products")]
        public ActionResult<CategoryWithProductsDto> GetCategoryWithProducts(int id)
        {
            try
            {
                var category = _categoryRepository.GetCategoryWithProducts(id);
                if (category == null)
                {
                    return NotFound();
                }

                var categoryDto = new CategoryWithProductsDto
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName,
                    Products = category.Products?.Select(p => new ProductDto
                    {
                        ProductId = p.ProductId,
                        ProductName = p.ProductName,
                        Price = p.Price,
                        StockQuantity = p.StockQuantity,
                        CategoryId = p.CategoryId,
                        CategoryName = category.CategoryName
                    }).ToList() ?? new List<ProductDto>()
                };

                return Ok(categoryDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/categories
        [HttpPost]
        public ActionResult<CategoryDto> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(createCategoryDto.CategoryName))
                {
                    return BadRequest("Category name is required.");
                }

                // Check if category name already exists
                if (_categoryRepository.CategoryNameExists(createCategoryDto.CategoryName))
                {
                    return BadRequest("Category name already exists.");
                }

                var category = new Category
                {
                    CategoryName = createCategoryDto.CategoryName
                };

                _categoryRepository.Add(category);
                _categoryRepository.Save();

                var categoryDto = new CategoryDto
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName,
                    ProductCount = 0
                };

                return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, categoryDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(updateCategoryDto.CategoryName))
                {
                    return BadRequest("Category name is required.");
                }

                var category = _categoryRepository.GetById(id);
                if (category == null)
                {
                    return NotFound();
                }

                // Check if category name already exists (excluding current category)
                if (_categoryRepository.CategoryNameExists(updateCategoryDto.CategoryName) &&
                    category.CategoryName != updateCategoryDto.CategoryName)
                {
                    return BadRequest("Category name already exists.");
                }

                category.CategoryName = updateCategoryDto.CategoryName;
                _categoryRepository.Update(category);
                _categoryRepository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                if (!_categoryRepository.CategoryExists(id))
                {
                    return NotFound();
                }

                var category = _categoryRepository.GetCategoryWithProducts(id);
                if (category.Products.Any())
                {
                    return BadRequest("Cannot delete category that has products. Please remove all products first.");
                }

                _categoryRepository.Delete(id);
                _categoryRepository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}