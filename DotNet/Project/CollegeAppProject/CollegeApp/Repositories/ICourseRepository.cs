using CollegeApp.Models;

namespace CollegeApp.Repositories
{
    public interface ICourseRepository : IGenericRepository<Course>
    {
        Task<IEnumerable<Course>> GetCoursesWithStudentsAsync();
        Task<Course?> GetCourseWithStudentsAsync(int id);
    }
}