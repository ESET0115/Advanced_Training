using CollegeApp.Models;

namespace CollegeApp.Data
{
    public static class SeedData
    {
        public static async Task Initialize(CollegeDbContext context)
        {
            // Check if courses already exist
            if (!context.Courses.Any())
            {
                var courses = new[]
                {
                    new Course { CourseCode = "CSE201", CourseName = "Web Technologies", Department = "CSE", Semester = 5 },
                    new Course { CourseCode = "CSE202", CourseName = "Artificial Intelligence", Department = "CSE", Semester = 6 },
                    new Course { CourseCode = "CSE203", CourseName = "Cloud Computing", Department = "CSE", Semester = 7 },
                    new Course { CourseCode = "ECE301", CourseName = "Microprocessors", Department = "ECE", Semester = 5 },
                    new Course { CourseCode = "ME401", CourseName = "Machine Design", Department = "Mechanical", Semester = 7 },
                    new Course { CourseCode = "CIV501", CourseName = "Structural Engineering", Department = "Civil", Semester = 8 },
                    new Course { CourseCode = "EEE101", CourseName = "Power Systems", Department = "EEE", Semester = 4 },
                    new Course { CourseCode = "IT301", CourseName = "Cyber Security", Department = "IT", Semester = 6 }
                };

                await context.Courses.AddRangeAsync(courses);
                await context.SaveChangesAsync();
            }

            // Check if students already exist
            if (!context.Students.Any())
            {
                var courses = context.Courses.ToList();

                var students = new[]
                {
                    new Student { RollNumber = "CSE010", Name = "Riya Fernandes", Email = "riya.fernandes@example.com", Phone = "9876123450", Address = "Derebail, Mangalore", DateOfBirth = new DateTime(2003, 1, 12), Gender = "Female", CourseId = courses[0].CourseId },
                    new Student { RollNumber = "CSE011", Name = "Aditya Rao", Email = "aditya.rao@example.com", Phone = "9890023345", Address = "Kadri, Mangalore", DateOfBirth = new DateTime(2002, 10, 5), Gender = "Male", CourseId = courses[1].CourseId },
                    new Student { RollNumber = "CSE012", Name = "Harini Shetty", Email = "harini.shetty@example.com", Phone = "9812345678", Address = "Surathkal, Mangalore", DateOfBirth = new DateTime(2003, 4, 20), Gender = "Female", CourseId = courses[2].CourseId },
                    new Student { RollNumber = "ECE013", Name = "Manoj Bhat", Email = "manoj.bhat@example.com", Phone = "9823412345", Address = "Padil, Mangalore", DateOfBirth = new DateTime(2002, 7, 16), Gender = "Male", CourseId = courses[3].CourseId },
                    new Student { RollNumber = "ME014", Name = "Sneha Dsouza", Email = "sneha.dsouza@example.com", Phone = "9845032190", Address = "Kulshekar, Mangalore", DateOfBirth = new DateTime(2003, 2, 22), Gender = "Female", CourseId = courses[4].CourseId },
                    new Student { RollNumber = "CIV015", Name = "Naveen Kumar", Email = "naveen.kumar@example.com", Phone = "9831122334", Address = "Bajpe, Mangalore", DateOfBirth = new DateTime(2002, 11, 9), Gender = "Male", CourseId = courses[5].CourseId },
                    new Student { RollNumber = "EEE016", Name = "Lavanya Jain", Email = "lavanya.jain@example.com", Phone = "9877896543", Address = "Puttur, DK", DateOfBirth = new DateTime(2003, 6, 28), Gender = "Female", CourseId = courses[6].CourseId },
                    new Student { RollNumber = "IT017", Name = "Rakesh Naik", Email = "rakesh.naik@example.com", Phone = "9865321470", Address = "Bantwal, DK", DateOfBirth = new DateTime(2002, 9, 3), Gender = "Male", CourseId = courses[7].CourseId },
                    new Student { RollNumber = "CSE018", Name = "Priya Shenoy", Email = "priya.shenoy@example.com", Phone = "9845071234", Address = "Bejai, Mangalore", DateOfBirth = new DateTime(2003, 12, 25), Gender = "Female", CourseId = courses[0].CourseId },
                    new Student { RollNumber = "CSE019", Name = "Karthik Nayak", Email = "karthik.nayak@example.com", Phone = "9856043217", Address = "Thokkottu, Mangalore", DateOfBirth = new DateTime(2003, 3, 9), Gender = "Male", CourseId = courses[2].CourseId }
                };

                await context.Students.AddRangeAsync(students);
                await context.SaveChangesAsync();
            }

            // Add default admin user
            if (!context.Users.Any())
            {
                var user = new User
                {
                    Username = "admin",
                    Email = "admin@college.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Role = "Admin"
                };

                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
            }
        }
    }
}