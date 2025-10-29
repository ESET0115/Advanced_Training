using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniversityAPI.Models;
using UniversityAPI.Repositories.Interfaces;

namespace UniversityAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;

        public StudentsController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            var students = await _studentRepository.GetAllAsync();
            return Ok(students);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _studentRepository.GetByIdAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpGet("rollnumber/{rollNumber}")]
        public async Task<ActionResult<Student>> GetStudentByRollNumber(string rollNumber)
        {
            var student = await _studentRepository.GetByRollNumberAsync(rollNumber);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudentsByCourse(int courseId)
        {
            var students = await _studentRepository.GetStudentsByCourseAsync(courseId);
            return Ok(students);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Student>> CreateStudent(Student student)
        {
            await _studentRepository.AddAsync(student);
            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }

            var existingStudent = await _studentRepository.GetByIdAsync(id);
            if (existingStudent == null)
            {
                return NotFound();
            }

            await _studentRepository.UpdateAsync(student);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _studentRepository.GetByIdAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            await _studentRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}