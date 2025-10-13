namespace WebApplication1.Model
{
    public class CollageRepository
    {
        public static List<Student> students { get; set; } = new List<Student>(){ new Student
            {
                studentId = 1,
                name = "Test",
                age = 19,
                email = "shivam@gmail.com"
            },

            new Student {
        
                studentId = 2,
                name = "Test2",
                age = 27,
                email = "dsckjbdsc"
            }

        };
    }
}
