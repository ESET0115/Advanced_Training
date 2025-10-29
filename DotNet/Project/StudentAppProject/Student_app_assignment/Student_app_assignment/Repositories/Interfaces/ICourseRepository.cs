using Student_app_assignment.Models;

namespace Student_app_assignment.Repositories.Interfaces
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllAsync();
        Task<Course?> GetByIdAsync(int id);
        Task<Course> AddAsync(Course course);
        Task UpdateAsync(Course course);
        Task DeleteAsync(int id);
        Task<IEnumerable<Course>> GetCoursesWithStudentsAsync();

    }
}
