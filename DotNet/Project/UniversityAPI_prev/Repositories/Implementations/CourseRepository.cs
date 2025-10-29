using Microsoft.EntityFrameworkCore;
using UniversityAPI.Models;
using UniversityAPI.Repositories.Interfaces;

namespace UniversityAPI.Repositories.Implementations
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        public CourseRepository(UniversityDbContext context) : base(context)
        {
        }

        public async Task<Course?> GetByCourseCodeAsync(string courseCode)
        {
            return await _context.Courses
                .FirstOrDefaultAsync(c => c.CourseCode == courseCode);
        }

        public async Task<IEnumerable<Course>> GetCoursesByDepartmentAsync(string department)
        {
            return await _context.Courses
                .Where(c => c.Department == department)
                .ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetCoursesWithStudentsAsync()
        {
            return await _context.Courses
                .Include(c => c.Students)
                .ToListAsync();
        }

        public async Task<Course?> GetCourseWithStudentsAsync(int id)
        {
            return await _context.Courses
                .Include(c => c.Students)
                .FirstOrDefaultAsync(c => c.CourseId == id);
        }

        public override async Task<IEnumerable<Course>> GetAllAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        public override async Task<Course?> GetByIdAsync(int id)
        {
            return await GetCourseWithStudentsAsync(id);
        }
    }
}