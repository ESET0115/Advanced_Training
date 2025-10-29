using UniversityAPI.Models;

namespace UniversityAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> AuthenticateAsync(LoginModel login);
        Task<bool> RegisterAsync(string username, string password, string role = "User");
        string GenerateJwtToken(User user);
    }
}