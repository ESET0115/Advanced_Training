using LibraryManagementAPI.Models;

namespace LibraryManagementAPI.Data.Repository
{
    public interface IAuthorRepository
    {
        Task<List<Author>> GetAllAsync();
        Task<Author?> GetAuthorByIdAsync(int id);
        Task<Author?> GetAuthorByNameAsync(string name);
        Task<int> CreateAuthorAsync(Author author);
        Task<int> UpdateAuthorAsync(Author author);
        Task<bool> DeleteAuthorAsync(int id);
    }
}
