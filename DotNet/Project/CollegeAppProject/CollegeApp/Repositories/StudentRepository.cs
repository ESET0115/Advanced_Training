using Microsoft.EntityFrameworkCore;
using CollegeApp.Data;
using CollegeApp.Models;

namespace CollegeApp.Repositories
{
    public class StudentRepository : GenericRepository<Student>, IStudentRepository
    {
        public StudentRepository(UniversityDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Student>> GetStudentsWithCoursesAsync()
        {
            return await _context.Students
                .Include(s => s.Course)
                .ToListAsync();
        }

        public async Task<Student?> GetStudentWithCourseAsync(int id)
        {
            return await _context.Students
                .Include(s => s.Course)
                .FirstOrDefaultAsync(s => s.StudentId == id);
        }

        public async Task<IEnumerable<Student>> GetStudentsByCourseAsync(int courseId)
        {
            return await _context.Students
                .Include(s => s.Course)
                .Where(s => s.CourseId == courseId)
                .ToListAsync();
        }

        public override async Task<IEnumerable<Student>> GetAllAsync()
        {
            return await _context.Students
                .Include(s => s.Course)
                .ToListAsync();
        }

        public override async Task<Student?> GetByIdAsync(int id)
        {
            return await _context.Students
                .Include(s => s.Course)
                .FirstOrDefaultAsync(s => s.StudentId == id);
        }
    }
}