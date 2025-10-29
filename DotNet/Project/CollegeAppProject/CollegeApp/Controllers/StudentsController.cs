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
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;

        public StudentsController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudents()
        {
            var students = await _studentRepository.GetStudentsWithCoursesAsync();
            var studentDtos = students.Select(s => new StudentDto
            {
                StudentId = s.StudentId,
                RollNumber = s.RollNumber,
                Name = s.Name,
                Email = s.Email,
                Phone = s.Phone,
                Address = s.Address,
                DateOfBirth = s.DateOfBirth,
                Gender = s.Gender,
                CourseId = s.CourseId,
                CourseName = s.Course?.CourseName
            });

            return Ok(studentDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDto>> GetStudent(int id)
        {
            var student = await _studentRepository.GetStudentWithCourseAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            var studentDto = new StudentDto
            {
                StudentId = student.StudentId,
                RollNumber = student.RollNumber,
                Name = student.Name,
                Email = student.Email,
                Phone = student.Phone,
                Address = student.Address,
                DateOfBirth = student.DateOfBirth,
                Gender = student.Gender,
                CourseId = student.CourseId,
                CourseName = student.Course?.CourseName
            };

            return Ok(studentDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<StudentDto>> CreateStudent(CreateStudentDto createStudentDto)
        {
            var student = new Student
            {
                RollNumber = createStudentDto.RollNumber,
                Name = createStudentDto.Name,
                Email = createStudentDto.Email,
                Phone = createStudentDto.Phone,
                Address = createStudentDto.Address,
                DateOfBirth = createStudentDto.DateOfBirth,
                Gender = createStudentDto.Gender,
                CourseId = createStudentDto.CourseId
            };

            await _studentRepository.AddAsync(student);

            var studentDto = new StudentDto
            {
                StudentId = student.StudentId,
                RollNumber = student.RollNumber,
                Name = student.Name,
                Email = student.Email,
                Phone = student.Phone,
                Address = student.Address,
                DateOfBirth = student.DateOfBirth,
                Gender = student.Gender,
                CourseId = student.CourseId
            };

            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, studentDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStudent(int id, UpdateStudentDto updateStudentDto)
        {
            var student = await _studentRepository.GetByIdAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.RollNumber = updateStudentDto.RollNumber;
            student.Name = updateStudentDto.Name;
            student.Email = updateStudentDto.Email;
            student.Phone = updateStudentDto.Phone;
            student.Address = updateStudentDto.Address;
            student.DateOfBirth = updateStudentDto.DateOfBirth;
            student.Gender = updateStudentDto.Gender;
            student.CourseId = updateStudentDto.CourseId;

            _studentRepository.Update(student);

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

        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudentsByCourse(int courseId)
        {
            var students = await _studentRepository.GetStudentsByCourseAsync(courseId);
            var studentDtos = students.Select(s => new StudentDto
            {
                StudentId = s.StudentId,
                RollNumber = s.RollNumber,
                Name = s.Name,
                Email = s.Email,
                Phone = s.Phone,
                Address = s.Address,
                DateOfBirth = s.DateOfBirth,
                Gender = s.Gender,
                CourseId = s.CourseId,
                CourseName = s.Course?.CourseName
            });

            return Ok(studentDtos);
        }
    }
}