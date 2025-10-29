using UniversityAPI.Models;

namespace UniversityAPI.Repositories.Interfaces
{
    public interface IStudentRepository : IRepository<Student>
    {
        Task<IEnumerable<Student>> GetStudentsByCourseAsync(int courseId);
        Task<Student?> GetByRollNumberAsync(string rollNumber);
        Task<IEnumerable<Student>> GetStudentsWithCoursesAsync();
        Task<Student?> GetStudentWithCourseAsync(int id);
    }
}