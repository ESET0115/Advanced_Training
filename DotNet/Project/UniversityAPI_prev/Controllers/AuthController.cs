using Microsoft.AspNetCore.Mvc;
using UniversityAPI.Models;
using UniversityAPI.Services.Interfaces;

namespace UniversityAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            try
            {
                var response = await _authService.AuthenticateAsync(login);
                return Ok(response);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid credentials");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginModel register)
        {
            var result = await _authService.RegisterAsync(register.Username, register.Password);
            if (!result)
            {
                return BadRequest("Username already exists");
            }

            return Ok("User registered successfully");
        }
    }
}