namespace Assignment1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Write your name:");
            string studentName = Console.ReadLine();

            Console.WriteLine("Type your marks in Physics:");
            double Physics = double.Parse(Console.ReadLine());

            Console.WriteLine("Type your marks in Chemistry:");
            double Chemistry = double.Parse(Console.ReadLine());

            Console.WriteLine("Type your marks in Maths:");
            double Maths = double.Parse(Console.ReadLine());

            Console.WriteLine("Type your marks in IT:");
            double IT = double.Parse(Console.ReadLine());

            Console.WriteLine("Type your marks in Physical Education:");
            double PE = double.Parse(Console.ReadLine());

            double totMarks = (Physics + Chemistry + Maths + IT + PE);

            double avgMarks = (Physics + Chemistry + Maths + IT + PE)/5;

            double prcntMarks = ((Physics + Chemistry + Maths + IT + PE) / 500) * 100;

            Console.WriteLine($"{studentName}'s total marks is {totMarks}, average marks is {avgMarks} and percentage marks is {prcntMarks}.");

            Console.ReadLine();
        }
    }
}
