using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}