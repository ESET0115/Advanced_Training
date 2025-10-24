using System.Collections.Generic;
using System.Linq;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Data.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly LibraryDbContext _dbContext;

        public AuthorRepository(LibraryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Author>> GetAllAsync()
        {
            return await _dbContext.Authors.AsNoTracking().ToListAsync();
        }

        public async Task<Author?> GetAuthorByIdAsync(int id)
        {
            return await _dbContext.Authors.AsNoTracking().FirstOrDefaultAsync(a => a.AuthorID == id);
        }

        public async Task<Author?> GetAuthorByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return null;
            return await _dbContext.Authors.AsNoTracking().FirstOrDefaultAsync(a => a.Name == name);
        }

        public async Task<int> CreateAuthorAsync(Author author)
        {
            if (author == null) throw new ArgumentNullException(nameof(author));
            await _dbContext.Authors.AddAsync(author);
            await _dbContext.SaveChangesAsync();
            return author.AuthorID;
        }

        public async Task<int> UpdateAuthorAsync(Author author)
        {
            if (author == null) throw new ArgumentNullException(nameof(author));

            var existing = await _dbContext.Authors.FirstOrDefaultAsync(a => a.AuthorID == author.AuthorID);
            if (existing == null) throw new InvalidOperationException("Author not found.");

            existing.Name = author.Name;
            existing.Country = author.Country;

            _dbContext.Authors.Update(existing);
            await _dbContext.SaveChangesAsync();

            return existing.AuthorID;
        }

        public async Task<bool> DeleteAuthorAsync(int id)
        {
            var existing = await _dbContext.Authors.FirstOrDefaultAsync(a => a.AuthorID == id);
            if (existing == null) return false;

            _dbContext.Authors.Remove(existing);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
