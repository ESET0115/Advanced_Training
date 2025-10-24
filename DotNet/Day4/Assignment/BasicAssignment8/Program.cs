namespace BasicAssignment8
{
    internal class Program
    {
        static void Main(string[] args)
        {
            double[] daily = { 5.2, 6.8, 0.0, 7.5, 6.0, 4.8, 0.0 };

            double total = 0;
            int peakDays = 0;
            int outageDays = 0;
            int normalDays = 0;

            for (int day = 0; day < daily.Length; day++)
            {
                double consumption = daily[day];
                total += consumption;

                if (consumption > 6.0)
                {
                    peakDays++;
                    Console.WriteLine($"Day {day + 1}: {consumption} kWh PEAK");
                }
                else if (consumption == 0.0)
                {
                    outageDays++;
                    Console.WriteLine($"Day {day + 1}: {consumption} kWh OUTAGE");
                }
                else
                {
                    normalDays++;
                    Console.WriteLine($"Day {day + 1}: {consumption} kWh NORMAL");
                }
            }

            double average = total / daily.Length;

            Console.WriteLine("\n--- Weekly Consumption Summary ---");
            Console.WriteLine($"Total Consumption: {total} kWh");
            Console.WriteLine($"Average Daily: {average} kWh");
            Console.WriteLine($"Peak Days (>6 kWh): {peakDays}");
            Console.WriteLine($"Normal Days: {normalDays}");
            Console.WriteLine($"Outage Days: {outageDays}");

            double peakPercentage = (double)peakDays / daily.Length * 100;
            Console.WriteLine($"Peak Day Percentage: {peakPercentage}%");
        }
    }
}
