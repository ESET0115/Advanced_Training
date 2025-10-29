using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CollegeApp.DTOs;
using CollegeApp.Models;
using CollegeApp.Repositories;

namespace CollegeApp.Controllers
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
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
        {
            var courses = await _courseRepository.GetCoursesWithStudentsAsync();
            var courseDtos = courses.Select(c => new CourseDto
            {
                CourseId = c.CourseId,
                CourseCode = c.CourseCode,
                CourseName = c.CourseName,
                Department = c.Department,
                Semester = c.Semester,
                StudentCount = c.Students.Count
            });

            return Ok(courseDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            var course = await _courseRepository.GetCourseWithStudentsAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            var courseDto = new CourseDto
            {
                CourseId = course.CourseId,
                CourseCode = course.CourseCode,
                CourseName = course.CourseName,
                Department = course.Department,
                Semester = course.Semester,
                StudentCount = course.Students.Count
            };

            return Ok(courseDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CourseDto>> CreateCourse(CreateCourseDto createCourseDto)
        {
            var course = new Course
            {
                CourseCode = createCourseDto.CourseCode,
                CourseName = createCourseDto.CourseName,
                Department = createCourseDto.Department,
                Semester = createCourseDto.Semester
            };

            await _courseRepository.AddAsync(course);

            var courseDto = new CourseDto
            {
                CourseId = course.CourseId,
                CourseCode = course.CourseCode,
                CourseName = course.CourseName,
                Department = course.Department,
                Semester = course.Semester,
                StudentCount = 0
            };

            return CreatedAtAction(nameof(GetCourse), new { id = course.CourseId }, courseDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourse(int id, UpdateCourseDto updateCourseDto)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            course.CourseCode = updateCourseDto.CourseCode;
            course.CourseName = updateCourseDto.CourseName;
            course.Department = updateCourseDto.Department;
            course.Semester = updateCourseDto.Semester;

            _courseRepository.Update(course);

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