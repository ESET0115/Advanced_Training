using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly EmployeeDBContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(EmployeeDBContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName && u.Password == loginModel.Password);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new
            {
                Token = token,
                UserName = user.UserName,
                Role = user.Role,
                ExpiresIn = 3600 // 1 hour in seconds
            });
        }
    }
}