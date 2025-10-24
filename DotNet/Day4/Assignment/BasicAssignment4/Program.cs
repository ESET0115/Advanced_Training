namespace BasicAssignment4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[][] meters = new int[][] {
                new[] { 4, 5, 0, 0, 6, 7, 3 }, // A
                new[] { 2, 2, 2, 2, 2, 2, 2 }, // B
                new[] { 9, 1, 1, 1, 1, 1, 1 }  // C
            };

            string[] ids = { "A-1001", "B-2001", "C-3001" };

            int globalMaxValue = 0;
            string globalMaxMeter = "";
            int globalMaxDay = 0;

            for (int meterIndex = 0; meterIndex < meters.Length; meterIndex++)
            {
                string meterId = ids[meterIndex];
                int[] days = meters[meterIndex];

                int total = 0;
                foreach (int usage in days)
                {
                    total += usage;
                }
                double average = (double)total / days.Length;

                bool peakAlert = false;
                for (int day = 0; day < days.Length; day++)
                {
                    if (days[day] > 8)
                    {
                        peakAlert = true;

                        if (days[day] > globalMaxValue)
                        {
                            globalMaxValue = days[day];
                            globalMaxMeter = meterId;
                            globalMaxDay = day + 1;
                        }
                    }
                }

                bool sustainedOutage = false;
                for (int day = 0; day < days.Length - 1; day++)
                {
                    if (days[day] == 0 && days[day + 1] == 0)
                    {
                        sustainedOutage = true;
                        break;
                    }
                }

                Console.WriteLine($"{meterId} | Total:{total} Avg:{average:F2} | Peak:{(peakAlert ? "Yes" : "No")} | SustainedOutage:{(sustainedOutage ? "Yes" : "No")}");
            }

            Console.WriteLine($"Highest Day: {globalMaxValue} kWh | Meter: {globalMaxMeter} | Day: {globalMaxDay}");
        }
    }
}
