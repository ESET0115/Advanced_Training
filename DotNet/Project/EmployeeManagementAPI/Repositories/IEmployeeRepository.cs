using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Repositories
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<Employee?> GetByEmailAsync(string email);
        Task<IEnumerable<Employee>> GetByDepartmentAsync(string department);
    }
}