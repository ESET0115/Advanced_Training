namespace Assignment6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== LOAD PROFILE ANALYSIS ===");

            int[] hourlyConsumption = {
            12, 10, 8, 7, 6, 5,    
            4, 3, 2, 1, 1, 1,      
            2, 3, 4, 5, 6, 7,      
            8, 10, 15, 20, 18, 16, 
            14, 13                 
        };

            DateTime profileDate = new DateTime(2025, 10, 1);

            try
            {
                LoadProfileDay day = new LoadProfileDay(profileDate, hourlyConsumption);

                Console.WriteLine("\n=== LOAD PROFILE SUMMARY ===");
                day.DisplayProfile();

                Console.WriteLine($"Peak Consumption: {day.PeakConsumption} kWh at hour {day.PeakHour}:00");

                day.DisplayHourlyData();

                Console.WriteLine("\n=== DEMONSTRATING ARRAY PROTECTION ===");
                hourlyConsumption[19] = 999;
                Console.WriteLine($"Original array modified to: {hourlyConsumption[19]}");
                Console.WriteLine($"Internal array unchanged: {day.HourlyKwh[19]}");

            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

            Console.WriteLine("\n=== ADDITIONAL TEST CASES ===");
            TestValidation();
            TestDifferentProfiles();
        }

        static void TestValidation()
        {
            Console.WriteLine("\nTesting validation:");

            // Test 1
            try
            {
                int[] invalidLength = { 1, 2, 3 };
                var invalidDay = new LoadProfileDay(DateTime.Now, invalidLength);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"✓ Correctly caught invalid length: {ex.Message}");
            }

            // Test 2
            try
            {
                int[] negativeValues = new int[24];
                negativeValues[10] = -5;
                var invalidDay = new LoadProfileDay(DateTime.Now, negativeValues);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"✓ Correctly caught negative value: {ex.Message}");
            }

            // Test 3
            try
            {
                int[] validData = new int[24];
                for (int i = 0; i < 24; i++) validData[i] = i * 2;
                var validDay = new LoadProfileDay(new DateTime(2025, 6, 15), validData);
                Console.WriteLine($"✓ Valid data accepted: {validDay.Date:yyyy-MM-dd} | Total: {validDay.Total} kWh");
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
            }
        }

        class LoadProfileDay
        {
            public DateTime Date { get; }
            public int[] HourlyKwh { get; }

            public LoadProfileDay(DateTime date, int[] hourly)
            {
                if (hourly == null || hourly.Length != 24)
                {
                    throw new ArgumentException("Hourly array must have exactly 24 elements.");
                }

                if (hourly.Any(kwh => kwh < 0))
                {
                    throw new ArgumentException("All hourly values must be non-negative.");
                }

                Date = date;

                HourlyKwh = new int[24];
                Array.Copy(hourly, HourlyKwh, 24);
            }

            public int Total => HourlyKwh.Sum();

            public int PeakHour
            {
                get
                {
                    int maxKwh = HourlyKwh[0];
                    int peakHour = 0;

                    for (int i = 1; i < HourlyKwh.Length; i++)
                    {
                        if (HourlyKwh[i] > maxKwh)
                        {
                            maxKwh = HourlyKwh[i];
                            peakHour = i;
                        }
                    }
                    return peakHour;
                }
            }

            public int PeakConsumption => HourlyKwh[PeakHour];

            public void DisplayProfile()
            {
                Console.WriteLine($"{Date:yyyy-MM-dd} | Total: {Total} kWh | PeakHour: {PeakHour}");
            }

            public void DisplayHourlyData()
            {
                Console.WriteLine($"\nDetailed consumption for {Date:yyyy-MM-dd}:");
                for (int i = 0; i < 24; i++)
                {
                    Console.WriteLine($"  Hour {i:D2}: {HourlyKwh[i]} kWh");
                }
            }
        }

        static void TestDifferentProfiles()
        {
            Console.WriteLine("\n=== DIFFERENT LOAD PROFILES ===");

            int[] flatProfile = new int[24];
            for (int i = 0; i < 24; i++) flatProfile[i] = 5;
            var flatDay = new LoadProfileDay(new DateTime(2025, 7, 1), flatProfile);
            flatDay.DisplayProfile();

            int[] morningPeak = new int[24];
            for (int i = 0; i < 24; i++)
                morningPeak[i] = i == 8 ? 25 : 3;
            var morningDay = new LoadProfileDay(new DateTime(2025, 7, 2), morningPeak);
            morningDay.DisplayProfile();

            int[] eveningPeak = new int[24];
            for (int i = 0; i < 24; i++)
                eveningPeak[i] = i >= 18 && i <= 21 ? 15 : 2;
            var eveningDay = new LoadProfileDay(new DateTime(2025, 7, 3), eveningPeak);
            eveningDay.DisplayProfile();
        }
    }
}
