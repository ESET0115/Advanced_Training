using CollegeApp.DTOs;
using CollegeApp.Models;


namespace CollegeApp.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto);
        string GenerateJwtToken(User user);
    }
}