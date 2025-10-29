using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student_app_assignment.Models;
using Student_app_assignment.Repositories.Interfaces;

namespace Student_app_assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _repository;

        public CoursesController(ICourseRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _repository.GetAllAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _repository.GetByIdAsync(id);
            if (course == null)
                return NotFound();

            return Ok(course);
        }
        [HttpGet("with-students")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetCoursesWithStudents()
        {
            var courses = await _repository.GetCoursesWithStudentsAsync();

            var result = courses.Select(c => new
            {
                c.CourseId,
                c.CourseName,
                c.Department,
                Students = (c.Students ?? Enumerable.Empty<Student>())
                .Select(s => new
                {
                    s.Name,
                    s.Email,
                    s.Phone,
                    s.Gender
                })
                .ToList()
            });

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(Course course)
        {
            var created = await _repository.AddAsync(course);
            return CreatedAtAction(nameof(Get), new { id = created.CourseId }, created);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, Course course)
        {
            if (id != course.CourseId)
                return BadRequest();

            await _repository.UpdateAsync(course);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
