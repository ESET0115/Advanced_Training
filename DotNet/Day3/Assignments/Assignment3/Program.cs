using System.Diagnostics.Metrics;

namespace Assignment3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== DEVICE MANAGEMENT SYSTEM ===");

            // Task 1
            Device[] devices = new Device[]
            {
            new Meter("AP-0001", new DateTime(2024, 7, 1), 3),
            new Gateway("GW-11", new DateTime(2025, 1, 10), "10.0.5.21")
            };

            // Task 2
            Console.WriteLine("\n=== DEVICE DESCRIPTIONS ===");
            foreach (Device device in devices)
            {
                Console.WriteLine(device.Describe());
            }

            Console.WriteLine("\n=== POLYMORPHISM DEMONSTRATION ===");
            DemonstratePolymorphism();

            Console.WriteLine("\n=== INDIVIDUAL DEVICE DETAILS ===");
            DisplayIndividualDevices(devices);
        }

        class Device
        {

            public string Id { get; set; }
            public DateTime InstalledOn { get; set; }

            public Device(string id, DateTime installedOn)
            {
                Id = id;
                InstalledOn = installedOn;
            }

            public virtual string Describe()
            {
                return $"Device {Id} | Installed: {InstalledOn:yyyy-MM-dd}";
            }
        }

        class Meter : Device
        {
            public int PhaseCount { get; set; }

            public Meter(string id, DateTime installedOn, int phaseCount)
                : base(id, installedOn)
            {
                PhaseCount = phaseCount;
            }

            public override string Describe()
            {
                return $"Meter {Id} | Installed: {InstalledOn:yyyy-MM-dd} | Phases: {PhaseCount}";
            }
        }

        class Gateway : Device
        {
            public string IpAddress { get; set; }

            public Gateway(string id, DateTime installedOn, string ipAddress)
                : base(id, installedOn)
            {
                IpAddress = ipAddress;
            }

            public override string Describe()
            {
                return $"Gateway {Id} | Installed: {InstalledOn:yyyy-MM-dd} | IP: {IpAddress}";
            }
        }

        static void DemonstratePolymorphism()
        {
            Device device1 = new Meter("MT-1001", new DateTime(2024, 5, 15), 1);
            Device device2 = new Gateway("GW-25", new DateTime(2024, 8, 20), "192.168.1.100");
            Device device3 = new Meter("MT-2002", new DateTime(2024, 12, 1), 3);

            Device[] moreDevices = { device1, device2, device3 };

            foreach (Device device in moreDevices)
            {
                Console.WriteLine(device.Describe());
            }
        }

        static void DisplayIndividualDevices(Device[] devices)
        {
            for (int i = 0; i < devices.Length; i++)
            {
                Console.WriteLine($"Device {i + 1}:");

                if (devices[i] is Meter meter)
                {
                    Console.WriteLine($"  Type: Meter");
                    Console.WriteLine($"  ID: {meter.Id}");
                    Console.WriteLine($"  Installed: {meter.InstalledOn:yyyy-MM-dd}");
                    Console.WriteLine($"  Phases: {meter.PhaseCount}");
                }
                else if (devices[i] is Gateway gateway)
                {
                    Console.WriteLine($"  Type: Gateway");
                    Console.WriteLine($"  ID: {gateway.Id}");
                    Console.WriteLine($"  Installed: {gateway.InstalledOn:yyyy-MM-dd}");
                    Console.WriteLine($"  IP Address: {gateway.IpAddress}");
                }
                Console.WriteLine();
            }
        }
    }
}
