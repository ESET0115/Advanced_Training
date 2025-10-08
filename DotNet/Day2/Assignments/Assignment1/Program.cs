namespace Assignment1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Task 1

            //Console.WriteLine("Welcome to the library!");

            //Book book1 = new Book(1, "The Alchemist", "Paolo Coelho", false);

            //book1.DisplayBookDetails();
            //book1.IssueBook();
            //book1.DisplayBookDetails();
            //book1.ReturnBook();
            //book1.DisplayBookDetails();

            //Task 2
            Console.WriteLine("Welcome to the Box Office!");

            Movie movie1 = new Movie("Endgame", 250, 0);

            movie1.DisplayAvailableSeats();
            movie1.BookSeats(38);
            movie1.DisplayAvailableSeats();
            movie1.CancelSeats(12);
            movie1.DisplayAvailableSeats();

            //Task 3
            Company.DisplayCompanyInfo();

            Company emp1 = new Company("Piyush Kumar", 1001);
            Company emp2 = new Company("Raj Malhotra", 1002);
            Company emp3 = new Company("Chintu Saxena", 1003);

            Console.WriteLine("\n=== Employee Details ===");
            emp1.DisplayEmployeeDetails();
            emp2.DisplayEmployeeDetails();
            emp3.DisplayEmployeeDetails();

            Company.DisplayCompanyInfo();

            Console.WriteLine($"All employees show same company: {Company.CompanyName}");

            Console.WriteLine("\n=== Changing Company Name ===");
            Company.ChangeCompanyName("InnovateTech Ltd.");

            Console.WriteLine("\n=== After Company Name Change ===");
            emp1.DisplayEmployeeDetails();
            emp2.DisplayEmployeeDetails();
            emp3.DisplayEmployeeDetails();

            Console.WriteLine("\n=== Adding More Employees ===");
            Company emp4 = new Company("Emily Wilson", 1004);
            Company emp5 = new Company("David Brown", 1005);

            emp4.DisplayEmployeeDetails();
            emp5.DisplayEmployeeDetails();

            Company.DisplayCompanyInfo();

            Console.WriteLine($"\nDirect static access - Company: {Company.CompanyName}");
            Console.WriteLine($"Direct static access - Total Employees: {Company.TotalEmployees}");




        }

        //used in task 1
        //class Book
        //{
        //    public int bookId;
        //    public string title;
        //    public string author;
        //    public bool isIssued;

        //    public Book (int bookId, string title, string author, bool isIssued)
        //    {
        //        this.bookId = bookId;
        //        this.title = title;
        //        this.author = author;
        //        this.isIssued = isIssued;
        //    }

        //    public void IssueBook()
        //    {
        //        isIssued = true;
        //        Console.WriteLine($"The book {title} by {author} with the book ID {bookId} is issued!");
        //    }

        //    public void ReturnBook()
        //    {
        //        isIssued = false;
        //        Console.WriteLine($"The book {title} by {author} with the book ID {bookId} is now returned to the library, and is available to be issued or re-issued!");
        //    }

        //    public void DisplayBookDetails()
        //    {
        //        Console.WriteLine($"Title: {title}");
        //        Console.WriteLine($"Author: {author}");
        //        Console.WriteLine($"Book ID: {bookId}");
        //        Console.WriteLine($"Availability: {!isIssued}");
        //    }
        //}

        //used in task 2

        class Movie
        {
            public string movieName;
            public int totalSeats;
            public int bookedSeats;

            public Movie(string movieName, int totalSeats, int bookedSeats)
            {
                this.movieName = movieName;
                this.totalSeats = totalSeats;
                this.bookedSeats = bookedSeats;
            }

            public void BookSeats(int n)
            {
                bookedSeats += n;
                Console.WriteLine($"{n} seats are now reserved for you, now the total number of seats available is {totalSeats - bookedSeats}");
            }

            public void CancelSeats(int n)
            {
                bookedSeats -= n;
                Console.WriteLine($"{n} number of reserved seats are now cancelled, now the total number of seats available is {totalSeats - bookedSeats}");
            }

            public void DisplayAvailableSeats()
            {
                Console.WriteLine($"Total number of seats: {totalSeats}");
                Console.WriteLine($"Seats Booked: {bookedSeats}");
                Console.WriteLine($"Seats Available: {totalSeats - bookedSeats}");
            }
        }

        //used in task 3
        class Company
        {
            public string EmployeeName { get; set; }
            public int EmployeeId { get; set; }

            public static string CompanyName = "Esyasoft Holdings";

            public static int TotalEmployees = 0;

            public Company(string employeeName, int employeeId)
            {
                EmployeeName = employeeName;
                EmployeeId = employeeId;
                TotalEmployees++;
            }

            public void DisplayEmployeeDetails()
            {
                Console.WriteLine($"Employee ID: {EmployeeId}");
                Console.WriteLine($"Employee Name: {EmployeeName}");
                Console.WriteLine($"Company: {CompanyName}");
                Console.WriteLine("------------------------");
            }

            public static void DisplayCompanyInfo()
            {
                Console.WriteLine($"=== Company Information ===");
                Console.WriteLine($"Company Name: {CompanyName}");
                Console.WriteLine($"Total Employees: {TotalEmployees}");
                Console.WriteLine("============================");
            }

            public static void ChangeCompanyName(string newName)
            {
                CompanyName = newName;
                Console.WriteLine($"Company name changed to: {newName}");
            }
        }
    }
}
