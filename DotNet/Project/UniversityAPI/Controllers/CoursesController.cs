using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniversityAPI.Models;
using UniversityAPI.Repositories.Interfaces;

namespace UniversityAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CoursesController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            var courses = await _courseRepository.GetAllAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }

        [HttpGet("code/{courseCode}")]
        public async Task<ActionResult<Course>> GetCourseByCode(string courseCode)
        {
            var course = await _courseRepository.GetByCourseCodeAsync(courseCode);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }

        [HttpGet("department/{department}")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCoursesByDepartment(string department)
        {
            var courses = await _courseRepository.GetCoursesByDepartmentAsync(department);
            return Ok(courses);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Course>> CreateCourse(Course course)
        {
            await _courseRepository.AddAsync(course);
            return CreatedAtAction(nameof(GetCourse), new { id = course.CourseId }, course);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourse(int id, Course course)
        {
            if (id != course.CourseId)
            {
                return BadRequest();
            }

            var existingCourse = await _courseRepository.GetByIdAsync(id);
            if (existingCourse == null)
            {
                return NotFound();
            }

            await _courseRepository.UpdateAsync(course);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            await _courseRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}