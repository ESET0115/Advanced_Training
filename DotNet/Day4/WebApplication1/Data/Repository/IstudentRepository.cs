using WebApplication1.Model;

namespace WebApplication1.Data.Repository
{
    public interface IstudentRepository
    {
        object students { get; }

        Task<List<studentDTO>> GetAll();
        Task<studentDTO> getstudentsbyid(int id);
        Task<studentDTO> getstudentbyname(string Name);
        int createstudent(studentDTO student);
        int UpdateStudent(studentDTO student);
        bool deletestudent(int id);

    }
}
