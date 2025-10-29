using UniversityAPI.Models;
using UniversityAPI.Repositories.Implementations;

namespace UniversityAPI.Repositories.Interfaces
{
    public interface ICourseRepository : IRepository<Course>
    {
        Task<Course?> GetByCourseCodeAsync(string courseCode);
        Task<IEnumerable<Course>> GetCoursesByDepartmentAsync(string department);
        Task<IEnumerable<Course>> GetCoursesWithStudentsAsync();
        Task<Course?> GetCourseWithStudentsAsync(int id);
    }
}