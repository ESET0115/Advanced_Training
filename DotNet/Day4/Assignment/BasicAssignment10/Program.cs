namespace BasicAssignment10
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] meterIds = { "MTR001", "MTR002", "MTR003" };
            int[][] outageHours = {
            new int[] { 1, 0, 0, 5, 2, 0, 0 }, // MTR001
            new int[] { 0, 0, 0, 0, 0, 0, 0 },  // MTR002
            new int[] { 0, 4, 3, 0, 0, 0, 0 }   // MTR003
        };

            Console.WriteLine("=== Meter Outage Analysis ===");
            Console.WriteLine();

            for (int meterIndex = 0; meterIndex < meterIds.Length; meterIndex++)
            {
                string meterId = meterIds[meterIndex];
                int[] hours = outageHours[meterIndex];
                int totalOutageHours = 0;

                for (int day = 0; day < hours.Length; day++)
                {
                    totalOutageHours += hours[day];
                }

                string action;
                if (totalOutageHours > 8)
                {
                    action = "Escalate to field team";
                }
                else if (totalOutageHours == 0)
                {
                    action = "Stable";
                }
                else
                {
                    action = "Monitor";
                }

                Console.WriteLine($"{meterId} | Outage Hours: {totalOutageHours} | Action: {action}");
            }
        }
    }
}
