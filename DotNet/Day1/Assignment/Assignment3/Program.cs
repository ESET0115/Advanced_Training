namespace Assignment3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Amount in INR:");
            double INR = double.Parse(Console.ReadLine());

            Console.WriteLine($"INR {INR} is equal to {INR/83.00} USD and {INR/90.50} EUR.");
            Console.ReadLine();
        }
    }
}
