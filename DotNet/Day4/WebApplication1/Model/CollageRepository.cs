namespace WebApplication1.Model
{
    public class CollageRepository
    {
        public static List<studentDTO> students { get; set; } = new List<studentDTO>(){ new studentDTO
            {
                studentId = 1,
                name = "Test",
                age = 19,
                email = "shivam@gmail.com"
            },

            new studentDTO {
        
                studentId = 2,
                name = "Test2",
                age = 27,
                email = "dsckjbdsc"
            }

        };
    }
}
