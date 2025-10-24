namespace Assignment1.Model;

namespace Assignment1.Services
{
    public interface IProductService
    {
        IEnumerable<ProductDTO> GetAllProducts();
        ProductDTO? GetProductById(int id);
        ProductDTO AddProduct(CreateProductRequest request);
        ProductDTO? UpdateProduct(int id, UpdateProductRequest request);
        ProductDTO? PatchProduct(int id, PatchProductRequest request);
        bool DeleteProduct(int id);
    }
}