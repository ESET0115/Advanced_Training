namespace BasicAssignment2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Input 7 daily kWh values for your meter: ");
            int[] daily = new int[7];

            for (int i = 0; i < 7; i++)
            {
                Console.Write($"Day {i + 1}: ");
                daily[i] = int.Parse(Console.ReadLine());
            }

            int total = 0;
            foreach (int kWh in daily)
            {
                total += kWh;
            }

            int average = total / 7;

            int max = daily[0];
            int index = 0;
            for(int i = 1; i < 7; i++)
            {
                if (daily[i] > max)
                {
                    max = daily[i];
                    index = i;
                }
            }

            int outageCount = 0;
            foreach(int kWh in daily)
            {
                if (kWh == 0)
                {
                    outageCount++;
                }
            }

            Console.WriteLine($"Total: {total} KWH | Average: {average} KWH | Max: {max} KWH (Day {index}) | No. Of Outages: {outageCount}");
        }
    }
}
