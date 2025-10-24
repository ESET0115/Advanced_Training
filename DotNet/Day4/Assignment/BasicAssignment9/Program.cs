namespace BasicAssignment9
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] status = { "OK", "OUTAGE", "OK", "TAMPER", "OUTAGE", "OK", "LOW_VOLT" };

            int okCount = 0;
            int outageCount = 0;
            int tamperCount = 0;
            int lowVoltCount = 0;

            foreach (string dayStatus in status)
            {
                if (dayStatus == "OK")
                {
                    okCount++;
                }
                else if (dayStatus == "OUTAGE")
                {
                    outageCount++;
                }
                else if (dayStatus == "TAMPER")
                {
                    tamperCount++;
                }
                else if (dayStatus == "LOW_VOLT")
                {
                    lowVoltCount++;
                }
            }

            Console.WriteLine($"OK: {okCount} | OUTAGE: {outageCount} | TAMPER: {tamperCount} | LOW_VOLT: {lowVoltCount}");

            if (outageCount > 2 || tamperCount > 1)
            {
                Console.WriteLine("Maintenance required");
            }
            else
            {
                Console.WriteLine("Meter healthy");
            }
        }
    }
}
