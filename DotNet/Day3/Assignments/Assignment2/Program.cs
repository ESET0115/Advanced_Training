namespace Assignment2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== TARIFF BILL CALCULATION SYSTEM ===");

            // Task 1: Create three tariffs using different constructors
            Console.WriteLine("\n=== CREATING TARIFFS ===");

            Tariff domestic = new Tariff("Domestic");
            domestic.DisplayTariffDetails();

            Tariff commercial = new Tariff("Commercial", 9.5);
            commercial.DisplayTariffDetails();

            Tariff agricultural = new Tariff("Agricultural", 3.0, 30.0);
            agricultural.DisplayTariffDetails();

            // Task 2: Compute and display bills for 120 units
            Console.WriteLine("\n=== BILL CALCULATION FOR 120 UNITS ===");
            int units = 120;

            Console.WriteLine($"\nCalculating bills for {units} units:");

            domestic.DisplayFormattedBill(units);
            commercial.DisplayFormattedBill(units);
            agricultural.DisplayFormattedBill(units);

            Console.WriteLine("\n=== ADDITIONAL DEMONSTRATIONS ===");

            int[] testUnits = { 50, 120, 200, 350 };

            foreach (int testUnit in testUnits)
            {
                Console.WriteLine($"\n--- For {testUnit} units ---");
                Console.WriteLine($"DOMESTIC: <{domestic.ComputeBill(testUnit)}");
                Console.WriteLine($"COMMERCIAL: <{commercial.ComputeBill(testUnit)}");
                Console.WriteLine($"AGRICULTURAL: <{agricultural.ComputeBill(testUnit)}");
            }

            Console.WriteLine("\n=== DETAILED BREAKDOWN FOR 120 UNITS ===");
            DisplayDetailedBreakdown(domestic, units);
            DisplayDetailedBreakdown(commercial, units);
            DisplayDetailedBreakdown(agricultural, units);

            Console.WriteLine("\n=== ADDITIONAL TARIFFS ===");
            Tariff industrial = new Tariff("Industrial", 12.0, 100.0);
            Tariff residential = new Tariff("Residential");

            industrial.DisplayFormattedBill(units);
            residential.DisplayFormattedBill(units);
        }

        class Tariff
        {
            public string Name { get; set; }
            public double RatePerKwh { get; set; }
            public double FixedCharge { get; set; }

            public Tariff(string name)
            {
                Name = name;
                RatePerKwh = 6.0;
                FixedCharge = 50.0;
            }

            public Tariff(string name, double rate)
            {
                Name = name;
                RatePerKwh = rate;
                FixedCharge = 50.0;
            }

            public Tariff(string name, double rate, double fixedCharge)
            {
                Name = name;
                RatePerKwh = rate;
                FixedCharge = fixedCharge;
            }

            public double ComputeBill(int units)
            {
                return (units * RatePerKwh) + FixedCharge;
            }

            // Method to display tariff details
            public void DisplayTariffDetails()
            {
                Console.WriteLine($"Tariff: {Name}");
                Console.WriteLine($"Rate: {RatePerKwh}/kWh, Fixed Charge: {FixedCharge}");
            }

            // Method to display formatted bill
            public void DisplayFormattedBill(int units)
            {
                double bill = ComputeBill(units);
                Console.WriteLine($"{Name.ToUpper()}: <{bill}");
            }
        }

        static void DisplayDetailedBreakdown(Tariff tariff, int units)
        {
            double energyCharge = units * tariff.RatePerKwh;
            double fixedCharge = tariff.FixedCharge;
            double totalBill = tariff.ComputeBill(units);

            Console.WriteLine($"\n{tariff.Name.ToUpper()} TARIFF:");
            Console.WriteLine($"  Units consumed: {units}");
            Console.WriteLine($"  Energy charge: {units} × {tariff.RatePerKwh} = {energyCharge}");
            Console.WriteLine($"  Fixed charge: {fixedCharge}");
            Console.WriteLine($"  Total bill: {energyCharge} + {fixedCharge} = {totalBill}");
        }


    }
}
