using Student_app_assignment.Models;

namespace Student_app_assignment.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<Users?> GetUserAsync(string username, string password);
        Task<Users> RegisterAsync(Users user);
        Task<bool> UserExistsAsync(string username);
    }
}
