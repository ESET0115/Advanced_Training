namespace BasicAssignment6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Previous Reading: ");
            int previousReading = int.Parse(Console.ReadLine());

            Console.Write("Current Reading: ");
            int currentReading = int.Parse(Console.ReadLine());

            int consumption = currentReading - previousReading;

            Console.Write($"Net Consumption: {consumption} kWh");

            if (consumption < 0)
            {
                Console.WriteLine("  Invalid Reading!");
            }
            else if (consumption == 0)
            {
                Console.WriteLine("  Possible Outage!");
            }
            else if (consumption > 500)
            {
                Console.WriteLine("  High Consumption Alert!");
            }
            else
            {
                Console.WriteLine();
            }
        }
    }
}
