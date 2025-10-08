namespace Assignment2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Meter meter1 = new Meter("AP-M1", "LTR-213, Andhra Pradesh", 18726);
            Meter meter2 = new Meter("JK-M2", "BGC-649, Jharkhand", 15892);

            meter1.Summary();
            meter1.AddReading(10000);
            meter1.Summary();
            meter2.Summary();
            meter2.AddReading(-10000);
            meter2.Summary();
        }

        class Meter
        {
            public string MeterSerial;
            public string Location;
            public int LastReadingKwh;

            public Meter(string MeterSerial, string Location, int LastReadingKwh)
            {
                this.MeterSerial = MeterSerial;
                this.Location = Location;
                this.LastReadingKwh = LastReadingKwh;
            }

            public void AddReading(int deltaKwh)
            {
                if(deltaKwh > 0)
                {
                    LastReadingKwh += deltaKwh;
                }
            }

            public void Summary()
            {
                Console.WriteLine($"SERIAL: {MeterSerial} | Location: {Location} | Reading: {LastReadingKwh}");
            }
        }
    }
}
