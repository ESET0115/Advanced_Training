namespace UniversityAPI.Models
{
    public partial class Course
    {
        public Course()
        {
            Students = new HashSet<Student>();
        }

        public int CourseId { get; set; }
        public string CourseCode { get; set; } = null!;
        public string CourseName { get; set; } = null!;
        public string? Department { get; set; }
        public int? Semester { get; set; }

        public virtual ICollection<Student> Students { get; set; }
    }
}