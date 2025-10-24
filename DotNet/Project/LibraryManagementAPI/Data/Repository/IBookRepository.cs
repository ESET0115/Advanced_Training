using LibraryManagementAPI.Models;

namespace LibraryManagementAPI.Data.Repository
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllAsync();
        Task<Book?> GetBookByIdAsync(int id);
        Task<Book?> GetBookByNameAsync(string name);
        Task<List<Book>> GetBooksByAuthorIdAsync(int authorId);
        Task<List<Book>> GetBooksByGenreAsync(string genre);
        Task<int> CreateBookAsync(Book book);
        Task<int> UpdateBookAsync(Book book);
        Task<bool> DeleteBookAsync(int id);
    }
}