using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WebApplication1.Model;


namespace WebApplication1.Data.Repository
{
    public class StudentRepository : IstudentRepository
    {
        private readonly CollageDBContext _dbcontext;

        public StudentRepository(CollageDBContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public int createstudent(studentDTO student)
        {
            throw new NotImplementedException();
        }

        public bool deletestudent(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<studentDTO>> GetAllAsync()
        {
            return await _dbcontext.students.ToListAsync();

        }

        public async Task<studentDTO> getstudentbyname(string Name)
        {
            //throw new NotImplementedException();
            return await _dbcontext.students.Where(n => n.name.ToLower().Equals(Name.ToLower())).FirstOrDefaultAsync();
        }

        public async Task<studentDTO> getstudentsbyid(int id)
        {
            //throw new NotImplementedException();
            return await _dbcontext.students.Where(n => n.studentId == id).FirstOrDefaultAsync();
        }

        //public studentDTO getstudentsbyname(string Name)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<int> UpdateStudentAsync(studentDTO student)
        {
            //throw new NotImplementedException();
            return await Task.FromResult(0);
        }
    }
}
