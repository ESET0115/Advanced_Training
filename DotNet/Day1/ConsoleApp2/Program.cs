namespace ConsoleApp2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Number of rows:");
            int rows = int.Parse(Console.ReadLine());

            Console.WriteLine("Number of columns:");
            int cols = int.Parse(Console.ReadLine());

            Console.WriteLine("Symbol:");
            char sym = char.Parse(Console.ReadLine());

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {   
                    Console.Write(sym);
                    if (j < cols - 1)
                    {
                        Console.Write(" ");
                    }
                }
                Console.WriteLine();
            }

            Console.ReadLine();
        }
    }
}
