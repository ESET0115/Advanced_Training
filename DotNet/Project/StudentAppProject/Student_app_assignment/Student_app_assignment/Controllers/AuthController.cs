using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Student_app_assignment.Models;
using Student_app_assignment.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Student_app_assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Users user)
        {
            if (await _userRepository.UserExistsAsync(user.Username))
                return BadRequest("Username already exists.");

            var createdUser = await _userRepository.RegisterAsync(user);
            return Ok(new { createdUser.Username });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Users login)
        {
            var user = await _userRepository.GetUserAsync(login.Username, login.Password);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = tokenDescriptor.Expires
            });
        }
    }
}
