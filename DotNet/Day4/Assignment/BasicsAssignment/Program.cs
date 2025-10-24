namespace BasicsAssignment
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Meter Serial Number: ");
            string meterSerialNumber = Console.ReadLine();

            Console.WriteLine("Previous Reading: ");
            int previousReading = int.Parse(Console.ReadLine());

            Console.WriteLine("Current Reading: ");
            int currentReading = int.Parse(Console.ReadLine());

            double unit = currentReading - previousReading;

            if (unit < 0)
            {
                Console.WriteLine("Error: Current reading cannot be less than previous reading.");
                return;
            }
            else
            {
                double energyCharge = unit*6.5;
                double tax = (energyCharge * 5) / 100;
                double total = energyCharge + tax;
                Console.WriteLine($"Meter Serial Number: {meterSerialNumber}");
                Console.WriteLine($"Previous Reading: {previousReading}");
                Console.WriteLine($"Current Reading: {currentReading}");
                Console.WriteLine($"Units Consumed: {unit}");
                Console.WriteLine($"Energy Charge: {energyCharge}");
                Console.WriteLine($"Tax Amount: {tax}");
                Console.WriteLine($"Total Amount: {total}");

            }

        }
    }
}
