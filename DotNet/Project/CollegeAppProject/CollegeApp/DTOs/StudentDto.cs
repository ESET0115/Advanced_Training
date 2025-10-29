namespace CollegeApp.DTOs
{
    public class StudentDto
    {
        public int StudentId { get; set; }
        public string RollNumber { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public int? CourseId { get; set; }
        public string? CourseName { get; set; }
    }

    public class CreateStudentDto
    {
        public string RollNumber { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public int? CourseId { get; set; }
    }

    public class UpdateStudentDto
    {
        public string RollNumber { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public int? CourseId { get; set; }
    }
}