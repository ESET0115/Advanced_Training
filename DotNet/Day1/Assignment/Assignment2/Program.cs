namespace Assignment2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Employee's name: ");
            string empName = Console.ReadLine();

            Console.WriteLine("Your Basic salary is: ");
            int basicSal = int.Parse(Console.ReadLine());

            double HRA = (basicSal * 20) / 100;

            double DA = (basicSal * 10) / 100;

            double Tax = (basicSal * 8) / 100;

            double gross = (basicSal + HRA + DA);

            Console.WriteLine($"Hello {empName}, your Gross salary is {gross} and your net salary is {gross - Tax}");
            Console.ReadLine();


        }
    }
}
