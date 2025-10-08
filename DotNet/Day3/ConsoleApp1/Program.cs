namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Listtttttt");
            List<string> food = new List<string>();
            food.Add("Pizza");
            food.Add("Burger");
            food.Add("Fries");

            food.Remove("fries");
            food.Insert(0, "meatballs");
            Console.WriteLine(food.Count);
            Console.WriteLine(food[1]);
        }
    }
}
