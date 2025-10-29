using CollegeApp.Models;

namespace CollegeApp.Repositories
{
    public interface IStudentRepository : IGenericRepository<Student>
    {
        Task<IEnumerable<Student>> GetStudentsWithCoursesAsync();
        Task<Student?> GetStudentWithCourseAsync(int id);
        Task<IEnumerable<Student>> GetStudentsByCourseAsync(int courseId);
    }
}