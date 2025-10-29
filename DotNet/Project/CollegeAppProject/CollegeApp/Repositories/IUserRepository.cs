using CollegeApp.Models;

namespace CollegeApp.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task<bool> UserExistsAsync(string username, string email);
    }
}