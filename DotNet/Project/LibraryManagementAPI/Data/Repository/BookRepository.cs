using LibraryManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Data.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly LibraryDbContext _dbContext;

        public BookRepository(LibraryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Book>> GetAllAsync()
        {
            return await _dbContext.Books.AsNoTracking().ToListAsync();
        }

        public async Task<Book?> GetBookByIdAsync(int id)
        {
            return await _dbContext.Books.AsNoTracking().FirstOrDefaultAsync(b => b.BookId == id);
        }

        public async Task<Book?> GetBookByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return null;
            return await _dbContext.Books.AsNoTracking().FirstOrDefaultAsync(b => b.Title == name);
        }

        public async Task<List<Book>> GetBooksByAuthorIdAsync(int authorId)
        {
            return await _dbContext.Books.Where(b => b.AuthorId == authorId).AsNoTracking().ToListAsync();
        }

        public async Task<List<Book>> GetBooksByGenreAsync(string genre)
        {
            if (string.IsNullOrWhiteSpace(genre)) return new List<Book>();
            return await _dbContext.Books.Where(b => b.Genre == genre).AsNoTracking().ToListAsync();
        }

        public async Task<int> CreateBookAsync(Book book)
        {
            if (book == null) throw new ArgumentNullException(nameof(book));
            await _dbContext.Books.AddAsync(book);
            await _dbContext.SaveChangesAsync();
            return book.BookId;
        }

        public async Task<int> UpdateBookAsync(Book book)
        {
            if (book == null) throw new ArgumentNullException(nameof(book));

            var existing = await _dbContext.Books.FirstOrDefaultAsync(b => b.BookId == book.BookId);
            if (existing == null) throw new InvalidOperationException("Book not found.");

            existing.Title = book.Title;
            existing.Genre = book.Genre;
            existing.AuthorId = book.AuthorId;

            _dbContext.Books.Update(existing);
            await _dbContext.SaveChangesAsync();

            return existing.BookId;
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            var existing = await _dbContext.Books.FirstOrDefaultAsync(b => b.BookId == id);
            if (existing == null) return false;

            _dbContext.Books.Remove(existing);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}