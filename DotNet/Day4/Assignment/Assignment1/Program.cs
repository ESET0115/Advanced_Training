using Assignment1;
using System.Runtime.CompilerServices;


//Employee Data
var employees = new List<Employee>
            {
                new Employee{ Id=1, Name="Ravi", Department="IT", Salary=85000, Experience=5, Location="Bangalore"},
                new Employee{ Id=2, Name="Priya", Department="HR", Salary=52000, Experience=4, Location="Pune"},
                new Employee{ Id=3, Name="Kiran", Department="Finance", Salary=73000, Experience=6, Location="Hyderabad"},
                new Employee{ Id=4, Name="Asha", Department="IT", Salary=95000, Experience=8, Location="Bangalore"},
                new Employee{ Id=5, Name="Vijay", Department="Marketing", Salary=68000, Experience=5, Location="Mumbai"},
                new Employee{ Id=6, Name="Deepa", Department="HR", Salary=61000, Experience=7, Location="Delhi"},
                new Employee{ Id=7, Name="Arjun", Department="Finance", Salary=82000, Experience=9, Location="Bangalore"},
                new Employee{ Id=8, Name="Sneha", Department="IT", Salary=78000, Experience=4, Location="Pune"},
                new Employee{ Id=9, Name="Rohit", Department="Marketing", Salary=90000, Experience=10, Location="Delhi"},
                new Employee{ Id=10, Name="Meena", Department="Finance", Salary=66000, Experience=3, Location="Mumbai"}
            };

//Product Data

var products = new List<Product>
            {
                new Product{ Id=1, Name="Laptop", Category="Electronics", Price=75000, Stock=15 },
                new Product{ Id=2, Name="Smartphone", Category="Electronics", Price=55000, Stock=25 },
                new Product{ Id=3, Name="Tablet", Category="Electronics", Price=30000, Stock=10 },
                new Product{ Id=4, Name="Headphones", Category="Accessories", Price=2000, Stock=100 },
                new Product{ Id=5, Name="Shirt", Category="Fashion", Price=1500, Stock=50 },
                new Product{ Id=6, Name="Jeans", Category="Fashion", Price=2200, Stock=30 },
                new Product{ Id=7, Name="Shoes", Category="Fashion", Price=3500, Stock=20 },
                new Product{ Id=8, Name="Refrigerator", Category="Appliances", Price=45000, Stock=8 },
                new Product{ Id=9, Name="Washing Machine", Category="Appliances", Price=38000, Stock=6 },
                new Product{ Id=10, Name="Microwave", Category="Appliances", Price=12000, Stock=12 }
            };

//Student Data

var students = new List<Student>
            {
                new Student{ Id=1, Name="Asha", Course="C#", Marks=92, City="Bangalore"},
                new Student{ Id=2, Name="Ravi", Course="Java", Marks=85, City="Pune"},
                new Student{ Id=3, Name="Sneha", Course="Python", Marks=78, City="Hyderabad"},
                new Student{ Id=4, Name="Kiran", Course="C#", Marks=88, City="Delhi"},
                new Student{ Id=5, Name="Meena", Course="Python", Marks=95, City="Bangalore"},
                new Student{ Id=6, Name="Vijay", Course="C#", Marks=82, City="Chennai"},
                new Student{ Id=7, Name="Deepa", Course="Java", Marks=91, City="Mumbai"},
                new Student{ Id=8, Name="Arjun", Course="Python", Marks=89, City="Hyderabad"},
                new Student{ Id=9, Name="Priya", Course="C#", Marks=97, City="Pune"},
                new Student{ Id=10, Name="Rohit", Course="Java", Marks=74, City="Delhi"}
            };

//Order Data

var orders = new List<Order>
            {
                new Order{ OrderId=1001, CustomerId=1, Amount=2500, OrderDate=new DateTime(2025,5,12)},
                new Order{ OrderId=1002, CustomerId=2, Amount=1800, OrderDate=new DateTime(2025,5,13)},
                new Order{ OrderId=1003, CustomerId=1, Amount=4500, OrderDate=new DateTime(2025,5,20)},
                new Order{ OrderId=1004, CustomerId=3, Amount=6700, OrderDate=new DateTime(2025,6,01)},
                new Order{ OrderId=1005, CustomerId=4, Amount=2500, OrderDate=new DateTime(2025,6,02)},
                new Order{ OrderId=1006, CustomerId=2, Amount=5600, OrderDate=new DateTime(2025,6,10)},
                new Order{ OrderId=1007, CustomerId=5, Amount=3100, OrderDate=new DateTime(2025,6,12)},
                new Order{ OrderId=1008, CustomerId=3, Amount=7100, OrderDate=new DateTime(2025,7,01)},
                new Order{ OrderId=1009, CustomerId=4, Amount=4200, OrderDate=new DateTime(2025,7,05)},
                new Order{ OrderId=1010, CustomerId=5, Amount=2900, OrderDate=new DateTime(2025,7,10)}
            };



// Employee tasks

// 1. Display all employees working in the IT department
var itEmployees = employees.Where(e => e.Department == "IT");
Console.WriteLine("IT Department Employees:");
foreach (var emp in itEmployees)
{
    Console.WriteLine($"Id: {emp.Id}, Name: {emp.Name}, Salary: {emp.Salary}");
}

// 2. List names and salaries of employees who earn more than 70,000
var highEarners = employees.Where(e => e.Salary > 70000)
                          .Select(e => new { e.Name, e.Salary });
Console.WriteLine("\nEmployees earning more than 70,000:");
foreach (var emp in highEarners)
{
    Console.WriteLine($"Name: {emp.Name}, Salary: {emp.Salary}");
}

// 3. Find all employees located in Bangalore
var bangaloreEmployees = employees.Where(e => e.Location == "Bangalore");
Console.WriteLine("\nEmployees in Bangalore:");
foreach (var emp in bangaloreEmployees)
{
    Console.WriteLine($"Name: {emp.Name}, Department: {emp.Department}");
}

// 4. Display employees having more than 5 years of experience
var experiencedEmployees = employees.Where(e => e.Experience > 5);
Console.WriteLine("\nEmployees with more than 5 years experience:");
foreach (var emp in experiencedEmployees)
{
    Console.WriteLine($"Name: {emp.Name}, Experience: {emp.Experience} years");
}

// 5. Show names of employees and their salaries in ascending order of salary
var employeesBySalaryAsc = employees.OrderBy(e => e.Salary)
                                   .Select(e => new { e.Name, e.Salary });
Console.WriteLine("\nEmployees sorted by salary (ascending):");
foreach (var emp in employeesBySalaryAsc)
{
    Console.WriteLine($"Name: {emp.Name}, Salary: {emp.Salary}");
}

// 6. Group employees by location and count how many employees are in each location
var employeesByLocation = employees.GroupBy(e => e.Location)
                                  .Select(g => new { Location = g.Key, Count = g.Count() });
Console.WriteLine("\nEmployee count by location:");
foreach (var group in employeesByLocation)
{
    Console.WriteLine($"Location: {group.Location}, Employee Count: {group.Count}");
}

// 7. Display employees whose salary is above the average salary
var averageSalary = employees.Average(e => e.Salary);
var aboveAverageEmployees = employees.Where(e => e.Salary > averageSalary);
Console.WriteLine($"\nEmployees with salary above average ({averageSalary}):");
foreach (var emp in aboveAverageEmployees)
{
    Console.WriteLine($"Name: {emp.Name}, Salary: {emp.Salary}");
}

// 8. Show top 3 highest-paid employees
var top3HighestPaid = employees.OrderByDescending(e => e.Salary)
                              .Take(3);
Console.WriteLine("\nTop 3 highest-paid employees:");
foreach (var emp in top3HighestPaid)
{
    Console.WriteLine($"Name: {emp.Name}, Salary: {emp.Salary}");
}



// Product tasks

// 1. Display all products with stock less than 20
var lowStockProducts = products.Where(p => p.Stock < 20);
Console.WriteLine("Products with stock less than 20:");
foreach (var product in lowStockProducts)
{
    Console.WriteLine($"Name: {product.Name}, Stock: {product.Stock}, Category: {product.Category}");
}

// 2. Show all products belonging to the "Fashion" category
var fashionProducts = products.Where(p => p.Category == "Fashion");
Console.WriteLine("\nFashion Category Products:");
foreach (var product in fashionProducts)
{
    Console.WriteLine($"Name: {product.Name}, Price: {product.Price}, Stock: {product.Stock}");
}

// 3. Display product names and prices where price is greater than 10,000
var expensiveProducts = products.Where(p => p.Price > 10000)
                               .Select(p => new { p.Name, p.Price });
Console.WriteLine("\nProducts with price greater than 10,000:");
foreach (var product in expensiveProducts)
{
    Console.WriteLine($"Name: {product.Name}, Price: {product.Price}");
}

// 4. List all product names sorted by price (descending)
var productsByPriceDesc = products.OrderByDescending(p => p.Price)
                                 .Select(p => new { p.Name, p.Price });
Console.WriteLine("\nProducts sorted by price (descending):");
foreach (var product in productsByPriceDesc)
{
    Console.WriteLine($"Name: {product.Name}, Price: {product.Price}");
}

// 5. Find the most expensive product in each category
var mostExpensiveByCategory = products.GroupBy(p => p.Category)
                                     .Select(g => new
                                     {
                                         Category = g.Key,
                                         Product = g.OrderByDescending(p => p.Price).First()
                                     });
Console.WriteLine("\nMost expensive product in each category:");
foreach (var item in mostExpensiveByCategory)
{
    Console.WriteLine($"Category: {item.Category}, Product: {item.Product.Name}, Price: {item.Product.Price}");
}

// 6. Show total stock per category
var stockPerCategory = products.GroupBy(p => p.Category)
                              .Select(g => new { Category = g.Key, TotalStock = g.Sum(p => p.Stock) });
Console.WriteLine("\nTotal stock per category:");
foreach (var category in stockPerCategory)
{
    Console.WriteLine($"Category: {category.Category}, Total Stock: {category.TotalStock}");
}

// 7. Display products whose name starts with 'S'
var productsStartingWithS = products.Where(p => p.Name.StartsWith("S"));
Console.WriteLine("\nProducts whose name starts with 'S':");
foreach (var product in productsStartingWithS)
{
    Console.WriteLine($"Name: {product.Name}, Category: {product.Category}, Price: {product.Price}");
}

// 8. Show average price of products in each category
var avgPricePerCategory = products.GroupBy(p => p.Category)
                                 .Select(g => new
                                 {
                                     Category = g.Key,
                                     AveragePrice = g.Average(p => p.Price)
                                 });
Console.WriteLine("\nAverage price per category:");
foreach (var category in avgPricePerCategory)
{
    Console.WriteLine($"Category: {category.Category}, Average Price: {category.AveragePrice}");
}



//Student tasks

// 1. Find the highest scorer in each course
var highestScorerPerCourse = students.GroupBy(s => s.Course)
                                    .Select(g => new
                                    {
                                        Course = g.Key,
                                        TopStudent = g.OrderByDescending(s => s.Marks).First()
                                    });
Console.WriteLine("Highest scorer in each course:");
foreach (var course in highestScorerPerCourse)
{
    Console.WriteLine($"Course: {course.Course}, Student: {course.TopStudent.Name}, Marks: {course.TopStudent.Marks}");
}

// 2. Display average marks of all students city-wise
var averageMarksByCity = students.GroupBy(s => s.City)
                                .Select(g => new
                                {
                                    City = g.Key,
                                    AverageMarks = g.Average(s => s.Marks)
                                });
Console.WriteLine("\nAverage marks city-wise:");
foreach (var city in averageMarksByCity)
{
    Console.WriteLine($"City: {city.City}, Average Marks: {city.AverageMarks}");
}

// 3. Display names and marks of students ranked by marks (descending)
var studentsRankedByMarks = students.OrderByDescending(s => s.Marks)
                                   .Select(s => new { s.Name, s.Marks, s.Course });
Console.WriteLine("\nStudents ranked by marks (highest to lowest):");
int rank = 1;
foreach (var student in studentsRankedByMarks)
{
    Console.WriteLine($"Rank {rank}: {student.Name} - {student.Marks} marks ({student.Course})");
    rank++;
}



// Order tasks

// 1. Find total order amount per month
var totalAmountPerMonth = orders.GroupBy(o => o.OrderDate.Month)
                               .Select(g => new
                               {
                                   Month = g.Key,
                                   MonthName = new DateTime(2025, g.Key, 1).ToString("MMMM"),
                                   TotalAmount = g.Sum(o => o.Amount),
                                   OrderCount = g.Count()
                               })
                               .OrderBy(x => x.Month);
Console.WriteLine("Total order amount per month:");
foreach (var month in totalAmountPerMonth)
{
    Console.WriteLine($"Month: {month.MonthName}, Total Amount: {month.TotalAmount}, Orders: {month.OrderCount}");
}

// 2. Show the customer who spent the most in total
var customerSpending = orders.GroupBy(o => o.CustomerId)
                            .Select(g => new
                            {
                                CustomerId = g.Key,
                                TotalSpent = g.Sum(o => o.Amount),
                                OrderCount = g.Count()
                            })
                            .OrderByDescending(x => x.TotalSpent)
                            .First();
Console.WriteLine($"\nCustomer who spent the most:");
Console.WriteLine($"Customer ID: {customerSpending.CustomerId}, Total Spent: {customerSpending.TotalSpent}, Orders: {customerSpending.OrderCount}");

// 3. Display orders grouped by customer and show total amount spent
var ordersByCustomer = orders.GroupBy(o => o.CustomerId)
                            .Select(g => new
                            {
                                CustomerId = g.Key,
                                TotalAmount = g.Sum(o => o.Amount),
                                AverageOrder = g.Average(o => o.Amount),
                                OrderCount = g.Count(),
                                Orders = g.OrderBy(o => o.OrderDate).ToList()
                            })
                            .OrderByDescending(x => x.TotalAmount);
Console.WriteLine("\nOrders grouped by customer (with total amount spent):");
foreach (var customer in ordersByCustomer)
{
    Console.WriteLine($"\nCustomer ID: {customer.CustomerId}");
    Console.WriteLine($"Total Amount: {customer.TotalAmount}, Average Order: {customer.AverageOrder}, Orders: {customer.OrderCount}");
    Console.WriteLine("Individual Orders:");
    foreach (var order in customer.Orders)
    {
        Console.WriteLine($"  Order ID: {order.OrderId}, Amount: {order.Amount}, Date: {order.OrderDate:MMM dd, yyyy}");
    }
}

// 4. Display the top 2 orders with the highest amount
var top2HighestOrders = orders.OrderByDescending(o => o.Amount)
                             .Take(2);
Console.WriteLine("\nTop 2 orders with the highest amount:");
foreach (var order in top2HighestOrders)
{
    Console.WriteLine($"Order ID: {order.OrderId}, Customer ID: {order.CustomerId}, Amount: {order.Amount}, Date: {order.OrderDate:MMM dd, yyyy}");
}


