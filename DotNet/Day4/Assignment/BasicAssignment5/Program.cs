namespace BasicAssignment5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] pattern = { 4, 4, 5, 5, 0, 6, 7, 3, 4, 5 };
            string category = "COMMERCIAL";

            int[] month = new int[30];
            for (int i = 0; i < 30; i++)
            {
                month[i] = pattern[i % pattern.Length];
            }

            int monthlyUnits = 0;
            int outageDays = 0;

            foreach (int units in month)
            {
                monthlyUnits += units;
                if (units == 0)
                {
                    outageDays++;
                }
            }

            double energyCharge = 0;
            int remainingUnits = monthlyUnits;

            if (remainingUnits > 100)
            {
                energyCharge += 100 * 4.0;
                remainingUnits -= 100;

                if (remainingUnits > 200)
                {
                    energyCharge += 200 * 6.0;
                    remainingUnits -= 200;
                    energyCharge += remainingUnits * 8.5;
                }
                else
                {
                    energyCharge += remainingUnits * 6.0;
                }
            }
            else
            {
                energyCharge = remainingUnits * 4.0;
            }

            double fixedCharge = 0;
            switch (category)
            {
                case "DOMESTIC":
                    fixedCharge = 50;
                    break;
                case "COMMERCIAL":
                    fixedCharge = 150;
                    break;
                default:
                    throw new ArgumentException("Invalid category");
            }

            double rebate = 0;
            if (outageDays == 0)
            {
                rebate = (energyCharge + fixedCharge) * 0.02;
            }

            double grandTotal = energyCharge + fixedCharge - rebate;

            Console.WriteLine($"Category: {category} | Units: {monthlyUnits} | Energy: ₹{energyCharge} | Fixed: ₹{fixedCharge} | Rebate: ₹{rebate} | Total: ₹{grandTotal} | Outages: {outageDays}");
        }
    }
}
