namespace Assignment4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ENERGY MONITORING SYSTEM ===");

            IReadable meter = new DimsMeter("AP-0001");
            IReadable gateway = new ModemGateway("GW-21");

            IReadable[] devices = { meter, gateway };

            Console.WriteLine("\n=== POLLING RESULTS (5 iterations) ===");

            for (int i = 1; i <= 5; i++)
            {
                Console.WriteLine($"\n--- Poll #{i} ---");

                foreach (IReadable device in devices)
                {
                    int deltaKwh = device.ReadKwh();
                    Console.WriteLine($"{device.SourceId} -> {deltaKwh} kWh");
                }
            }

            Console.WriteLine("\n=== EXTENDED DEMONSTRATION ===");
            DemonstrateMultipleDevices();
        }

        public interface IReadable
        {
            int ReadKwh();
            string SourceId { get; }
        }

        public class DimsMeter : IReadable
        {
            private Random random;
            private int lastReading;

            public string SourceId { get; }

            public DimsMeter(string sourceId)
            {
                SourceId = sourceId;
                random = new Random();
                lastReading = random.Next(1000, 10000);
            }

            public int ReadKwh()
            {
                int delta = random.Next(1, 11);
                lastReading += delta;
                return delta;
            }
        }

        public class ModemGateway : IReadable
        {
            private Random random;

            public string SourceId { get; }

            public ModemGateway(string sourceId)
            {
                SourceId = sourceId;
                random = new Random();
            }

            public int ReadKwh()
            {
                return random.Next(0, 3);
            }
        }

        static void DemonstrateMultipleDevices()
        {
            IReadable[] multipleDevices = {
            new DimsMeter("AP-0001"),
            new DimsMeter("AP-0002"),
            new ModemGateway("GW-21"),
            new ModemGateway("GW-22"),
            new ModemGateway("GW-23")
        };

            Console.WriteLine("Polling 3 times with multiple devices:");

            for (int i = 1; i <= 3; i++)
            {
                Console.WriteLine($"\nPoll #{i}:");
                foreach (IReadable device in multipleDevices)
                {
                    int delta = device.ReadKwh();
                    Console.WriteLine($"  {device.SourceId} -> {delta} kWh");
                }
            }
        }
    }
}
