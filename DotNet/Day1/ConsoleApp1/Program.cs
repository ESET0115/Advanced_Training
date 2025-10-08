namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string fullname = "Piyush Kumar"; 
            string contact = "124-683-7942";

            contact = contact.Replace('-', '/');
            string userName = fullname.Insert(0, "Mr. ");
            Console.WriteLine(userName);
            Console.WriteLine(contact);

            Console.WriteLine(fullname.Length);

            string firstname = fullname.Substring(0, 6);
            Console.WriteLine(firstname);
            Console.WriteLine("Enter your age: ");

            var age = Console.ReadLine();
            int ageInt = int.Parse(age);

            if (ageInt >= 22)
            {
                Console.WriteLine("You are eligible to be a drunkard!");
            }
            else
            {
                Console.WriteLine("!!!!");
            }

            string message;

            message = ((ageInt <= 18) ? "You are not an adult" : "You are an adult");
            Console.WriteLine(message);
            
            Console.WriteLine($"Your name is {firstname} and your age is {age}");

            string DOTW = Console.ReadLine();

            switch (DOTW)
            {
                case "Monday":
                    Console.WriteLine("It's Monday Today!"); break;

                case "Tuesday":
                    Console.WriteLine("It's Tuesday Today!"); break;

                case "Wednesday":
                    Console.WriteLine("It's Wednesday Today!"); break;

                case "Thursday":
                    Console.WriteLine("It's Thursday Today!"); break;

                case "Friday":
                    Console.WriteLine("It's Friday Today!"); break;

                case "Saturday":
                    Console.WriteLine("It's Saturday Today!"); break;

                case "Sunday":
                    Console.WriteLine("It's Sunday Today!"); break;

                default:
                    Console.WriteLine("Please check if you have mentioned the DOTW correctly"); break;
            }


            Console.ReadLine();




        }
    }
}
