using Microsoft.AspNetCore.Mvc;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
  
        [Route("api/[controller]")]

    [ApiController]

    public class CollageApp : ControllerBase

    {

        [HttpGet]

        [Route("All")]

        public IEnumerable<Student> getStudents()
        {
            return CollageRepository.students;
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
        public ActionResult<Student> getstudentbyid(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid student ID");
            }

            var students = CollageRepository.students.Where(n => n.studentId == id).FirstOrDefault();

            if (students == null)
            {
                return NotFound($"Id {id} is not present in the records.");
            }

            return Ok(students);

        }


        [HttpGet("{name:alpha}", Name = "GetStudentByName")]
        public Student GetStudentByName(string name)
        {
            return CollageRepository.students.Where(n => n.name == name).FirstOrDefault();
        }
        [HttpDelete]
        public bool DeleteStudent(int id)
        {
            var deleting = CollageRepository.students.Where(n => n.studentId == id).FirstOrDefault();
            if (deleting != null) CollageRepository.students.Remove(deleting);
            return true;
        }
    }

}



