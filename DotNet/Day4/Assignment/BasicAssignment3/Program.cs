namespace BasicAssignment3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] lines = {
            "2025-09-01,4.2,OK",
            "2025-09-02,5.0,OK",
            "2025-09-03,0.0,OUTAGE",
            "2025-09-04,3.8,OK",
            "2025-09-05,6.1,OK",
            "2025-09-06,2.5,TAMPER",
            "2025-09-07,5.4,OK"
        };

            double okSum = 0;
            int okCount = 0;
            int outageCount = 0;
            int tamperCount = 0;

            foreach (string line in lines)
            {
                string[] parts = line.Split(',');

                if (parts.Length == 3)
                {
                    string status = parts[2];

                    if (status == "OK")
                    {
                        double kWh = double.Parse(parts[1]);
                        okSum += kWh;
                        okCount++;
                    }
                    else if (status == "OUTAGE")
                    {
                        outageCount++;
                    }
                    else if (status == "TAMPER")
                    {
                        tamperCount++;
                    }
                }
            }

            double okAverage = okCount > 0 ? okSum / okCount : 0;

            Console.WriteLine($"OK: {okSum} kWh (avg {okAverage}) | OUTAGE: {outageCount} | TAMPER: {tamperCount}");
        }
    }
}
