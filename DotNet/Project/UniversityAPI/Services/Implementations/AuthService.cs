using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UniversityAPI.Models;
using UniversityAPI.Repositories.Interfaces;
using UniversityAPI.Services.Interfaces;

namespace UniversityAPI.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IRepository<User> _userRepository;

        public AuthService(IConfiguration configuration, IRepository<User> userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        public async Task<AuthResponse> AuthenticateAsync(LoginModel login)
        {
            var users = await _userRepository.FindAsync(u => u.Username == login.Username);
            var user = users.FirstOrDefault();

            if (user == null || !VerifyPassword(login.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid username or password");
            }

            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddHours(24),
                Username = user.Username,
                Role = user.Role
            };
        }

        public async Task<bool> RegisterAsync(string username, string password, string role = "User")
        {
            var existingUsers = await _userRepository.FindAsync(u => u.Username == username);
            if (existingUsers.Any())
            {
                return false;
            }

            var user = new User
            {
                Username = username,
                PasswordHash = HashPassword(password),
                Role = role
            };

            await _userRepository.AddAsync(user);
            return true;
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}