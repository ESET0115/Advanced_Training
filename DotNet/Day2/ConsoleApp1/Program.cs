namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Heyy human!");
            Console.WriteLine("Enter your name:");
            string name = Console.ReadLine();
            Console.WriteLine("Enter your age:");
            int age = int.Parse(Console.ReadLine());


            human human1 = new human(name, age);

            human1.eat();
            human1.sleep();
        }
    }


    class human
    {
        public string name;
        public int age;

        public human(string Name, int Age)
        {
            name = Name;
            age = Age;
        }

        public void eat()
        {
            Console.WriteLine(name + " is eating rn!");
        }

        public void sleep()
        {
            Console.WriteLine(name + " is sleeping rn!");
        }
    }


}
