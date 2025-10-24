using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Validations;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using WebApplication1.Data;
using WebApplication1.Data.Repository;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
  
    [Route("api/[controller]")]

    [ApiController]



    public class CollageApp : ControllerBase

    {

        //[HttpGet]
        //[Route("All")]
        //public IEnumerable<Student> getStudents()
        //{
        //    return CollageRepository.students;
        //}
        private readonly IstudentRepository _IstudentRepository;

        public CollageApp(IstudentRepository IstudentRepositor)
        {
            _IstudentRepository = IstudentRepositor;
        }

        [HttpGet]
        [Route("All")]
        public ActionResult<IEnumerable<studentDTO>> getstudents()
        {
            //var students = CollageRepository.students.Select(s => new studentDTO()
            //{
            //    studentId = s.studentId,
            //    name = s.name,
            //    age = s.age,
            //    email = s.email
            //});

            //var students = CollageRepository.students.Where(n => n.studentId == id).FirstOrDefault();
            var Students = _IstudentRepository.GetAll.ToList();

            if (Students == null)
            {
                return NotFound("No students found");
            }

            //var studentDTO = new studentDTO()
            //{
            //    //studentId = students.studentId,
            //    name = Students.name,
            //    age = Students.age,
            //    email = Students.email
            //};

            return Ok(Students);
        }

        //[HttpGet("{id:int}", Name = "GetStudentById")]
        //public Student GetStudentById(int id)
        //{
        //    return CollageRepository.students.Where(n => n.studentId == id).FirstOrDefault();
        //}

        [HttpGet("{id:int}", Name = "getstudentbyid")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<studentDTO>> getstudentbyid(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid student ID");
            }

            //var students = await _DBContext.students.Where(n => n.studentId == id).FirstOrDefaultAsync();
            ////var students = CollageRepository.students.Where(n => n.studentId == id).FirstOrDefault();

            //if (students == null)
            //{
            //    return NotFound($"Id {id} is not present in the records.");
            //}

            var students =  _IstudentRepository.getstudentsbyid(id);

            if (students == null)
            {
                return NotFound($"Id {id} is not present in the records.");
            }

                return Ok(students);
        }

        [HttpGet("{name:alpha}", Name = "GetStudentByName")]
        public ActionResult<studentDTO> GetStudentByName(string name)
        {
            var found = CollageRepository.students.Where(n => n.name == name).FirstOrDefault();

            if (found == null) return NotFound();
            return Ok(found);
        }

        [HttpDelete("{id:int}")]
        public bool DeleteStudent(int id)
        {
            var deleting = CollageRepository.students.Where(n => n.studentId == id).FirstOrDefault();
            if (deleting != null) CollageRepository.students.Remove(deleting);
            return true;
        }

        [HttpPost("Create")]
        public async Task<ActionResult<studentDTO>> CreateStudent([FromBody] studentDTO student)
        {
            if (student == null)
            {
                return BadRequest("Student is null");
            }

            //int newId = CollageRepository.students.LastOrDefault().studentId + 1;
            //int newId = _DBContext.students.LastOrDefault().studentId + 1;

            StudentDB studentnew = new StudentDB()
            {
                name = student.name,
                age = student.age,
                email = student.email
            };

            _IstudentRepository.Add(studentnew);
            //CollageRepository.students.Add(studentnew);

            _IstudentRepository.SaveChangesAsync();

            return Ok(student);
        }

        [HttpPut]
        [Route("Update")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<ActionResult> UpdateStudent([FromBody] studentDTO student)
        {
            if (student == null)
            {
                return BadRequest("Student is null or ID mismatch");
            }

            //var existingStudent = CollageRepository.students.Where(n => n.studentId == student.studentId).FirstOrDefault();
            var existingStudent = await _IstudentRepository.students.Where(n => n.studentId == student.studentId).FirstOrDefaultAsync();

            if (existingStudent == null)
            {
                return NotFound($"Student with ID {student.studentId} not found");
            }
            existingStudent.name = student.name;
            existingStudent.age = student.age;
            existingStudent.email = student.email;

            _IstudentRepository.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch]
        [Route("{id:int}/UpdatePartial")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<ActionResult> UpdateStudentPartial(int id, [FromBody] studentDTO student)
        {
            if (student == null || id != student.studentId)
            {
                return BadRequest("Student is null or ID mismatch");
            }

            //var existingStudent = CollageRepository.students.Where(n => n.studentId == id).FirstOrDefault();
            var existingStudent = await _DBContext.students.Where(n => n.studentId == id).FirstOrDefaultAsync();

            if (existingStudent == null)
            {
                return NotFound($"Student with ID {id} not found");
            }

            if (student.name != null)
            {
                existingStudent.name = student.name;
            }

            if (student.age != 0)
            {
                existingStudent.age = student.age;
            }

            if (student.email != null)
            {
                existingStudent.email = student.email;
            }
            _IstudentRepository.SaveChangesAsync();
            return NoContent();
        }

        // Explicit HTTP method binding added to avoid ambiguous-method error in Swagger/OpenAPI
        [HttpGet("AllAsync")]
        public async Task<ActionResult<IEnumerable<studentDTO>>> GetStudentsAsync()
        {
            // Return the DTOs stored in the DbSet directly (DbSet is defined as DbSet<studentDTO>)
            var students = await _IstudentRepository.students.ToListAsync();
            return Ok(students);
        }






    }

}



