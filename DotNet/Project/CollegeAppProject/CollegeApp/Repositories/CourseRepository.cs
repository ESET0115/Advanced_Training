using Microsoft.EntityFrameworkCore;
using CollegeApp.Data;
using CollegeApp.Models;

namespace CollegeApp.Repositories
{
    public class CourseRepository : GenericRepository<Course>, ICourseRepository
    {
        public CourseRepository(UniversityDbContext context) : base(context)
        {
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
    }
}