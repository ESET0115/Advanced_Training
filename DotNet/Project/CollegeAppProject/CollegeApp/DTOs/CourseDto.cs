namespace CollegeApp.DTOs
{
    public class CourseDto
    {
        public int CourseId { get; set; }
        public string CourseCode { get; set; } = null!;
        public string CourseName { get; set; } = null!;
        public string? Department { get; set; }
        public int? Semester { get; set; }
        public int StudentCount { get; set; }
    }

    public class CreateCourseDto
    {
        public string CourseCode { get; set; } = null!;
        public string CourseName { get; set; } = null!;
        public string? Department { get; set; }
        public int? Semester { get; set; }
    }

    public class UpdateCourseDto
    {
        public string CourseCode { get; set; } = null!;
        public string CourseName { get; set; } = null!;
        public string? Department { get; set; }
        public int? Semester { get; set; }
    }
}