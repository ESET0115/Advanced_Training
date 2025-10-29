using Microsoft.EntityFrameworkCore;
using UniversityAPI.Models;
using UniversityAPI.Repositories.Interfaces;

namespace UniversityAPI.Repositories.Implementations
{
    public class StudentRepository : Repository<Student>, IStudentRepository
    {
        public StudentRepository(UniversityDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Student>> GetStudentsByCourseAsync(int courseId)
        {
            return await _context.Students
                .Where(s => s.CourseId == courseId)
                .Include(s => s.Course)
                .ToListAsync();
        }

        public async Task<Student?> GetByRollNumberAsync(string rollNumber)
        {
            return await _context.Students
                .Include(s => s.Course)
                .FirstOrDefaultAsync(s => s.RollNumber == rollNumber);
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

        public override async Task<IEnumerable<Student>> GetAllAsync()
        {
            return await _context.Students
                .Include(s => s.Course)
                .ToListAsync();
        }

        public override async Task<Student?> GetByIdAsync(int id)
        {
            return await GetStudentWithCourseAsync(id);
        }
    }
}