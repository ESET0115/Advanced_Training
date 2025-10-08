namespace Assignment4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Input time in minutes:");
            int time = int.Parse(Console.ReadLine());

            Console.WriteLine($"{time} minutes is equal to {time/60} Hrs and {time%60} mins.");
            Console.ReadLine();
        }
    }
}
