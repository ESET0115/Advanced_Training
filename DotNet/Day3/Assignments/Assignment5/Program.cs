namespace Assignment5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== BILLING ENGINE SYSTEM ===");

            int units = 120;

            IBillingRule[] rules = {
            new DomesticRule(),
            new CommercialRule(),
            new AgricultureRule()
            };

            string[] categories = { "DOMESTIC", "COMMERCIAL", "AGRICULTURE" };

            Console.WriteLine($"\n=== BILLS FOR {units} UNITS ===");

            for (int i = 0; i < rules.Length; i++)
            {
                BillingEngine engine = new BillingEngine(rules[i]);
                double amount = engine.GenerateBill(units);
                Console.WriteLine($"{categories[i]} -> <{amount:F2}");
            }

            Console.WriteLine("\n=== DIRECT RULE COMPUTATION ===");
            foreach (var rule in rules)
            {
                double amount = rule.Compute(units);
                string category = rule switch
                {
                    DomesticRule => "DOMESTIC",
                    CommercialRule => "COMMERCIAL",
                    AgricultureRule => "AGRICULTURE",
                    _ => "UNKNOWN"
                };
                Console.WriteLine($"{category} -> <{amount:F2}");
            }

            Console.WriteLine("\n=== COMPARISON FOR DIFFERENT CONSUMPTION ===");
            int[] testUnits = { 50, 120, 200, 500 };

            foreach (int testUnit in testUnits)
            {
                Console.WriteLine($"\nFor {testUnit} units:");
                foreach (var rule in rules)
                {
                    double amount = rule.Compute(testUnit);
                    string category = rule.GetType().Name.Replace("Rule", "").ToUpper();
                    Console.WriteLine($"  {category} -> <{amount:F2}");
                }
            }
        }

        public interface IBillingRule
        {
            double Compute(int units);
        }

        class DomesticRule : IBillingRule
        {
            public double Compute(int units)
            {
                return (units * 6.0) + 50;
            }
        }

        class CommercialRule : IBillingRule
        {
            public double Compute(int units)
            {
                return (units * 8.5) + 150;
            }
        }

        class AgricultureRule : IBillingRule
        {
            public double Compute(int units)
            {
                return units * 3.0;
            }
        }

        class BillingEngine
        {
            private IBillingRule _rule;

            public IBillingRule Rule
            {
                get => _rule;
                set => _rule = value;
            }

            public BillingEngine(IBillingRule rule)
            {
                _rule = rule;
            }

            public double GenerateBill(int units)
            {
                return _rule.Compute(units);
            }
        }


    }
}
