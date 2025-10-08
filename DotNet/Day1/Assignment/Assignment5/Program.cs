namespace Assignment5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Task 1
            Console.WriteLine("Number\tSquare\tCube");
            Console.WriteLine("=====================");

            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"{i}\t{i * i}\t{i * i * i}");
            }

            //Task 2
            Console.WriteLine("Perfect numbers between 1 and 1000:");

            for (int num = 1; num <= 1000; num++)
            {
                if (IsPerfectNumber(num))
                {
                    Console.WriteLine(num);
                }
            }

            // Task 3

            int n = 5;

            for (int i = n; i >= 1; i--)
            {
                for (int j = 1; j <= n - i; j++)
                    Console.Write(" ");

                for (int j = 1; j <= 2 * i - 1; j++)
                    Console.Write("*");

                Console.WriteLine();
            }

            for (int i = 2; i <= n; i++)
            {
                for (int j = 1; j <= n - i; j++)
                    Console.Write(" ");

                for (int j = 1; j <= 2 * i - 1; j++)
                    Console.Write("*");

                Console.WriteLine();
            }

            //Task 4
            int n = 5;

            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j <= n - i; j++)
                    Console.Write(" ");

                for (int j = 1; j <= i; j++)
                    Console.Write(j);

                for (int j = i - 1; j >= 1; j--)
                    Console.Write(j);

                Console.WriteLine();
            }

            for (int i = n - 1; i >= 1; i--)
            {
                for (int j = 1; j <= n - i; j++)
                    Console.Write(" ");

                for (int j = 1; j <= i; j++)
                    Console.Write(j);

                for (int j = i - 1; j >= 1; j--)
                    Console.Write(j);

                Console.WriteLine();
            }

            //Task 5
            int rows = 5;

            for (int i = 1; i <= rows; i++)
            {
                int start = (i % 2 == 1) ? 1 : 0;

                for (int j = 1; j <= i; j++)
                {
                    Console.Write(start);
                    start = 1 - start; // Alternate between 0 and 1
                }
                Console.WriteLine();
            }

            //Task 6
            Console.WriteLine("Armstrong numbers between 100 and 999:");

            for (int num = 100; num <= 999; num++)
            {
                if (IsArmstrongNumber(num))
                {
                    Console.WriteLine(num);
                }
            }

            //Task 7
            Console.WriteLine("Fibonacci series in reverse order:");

            int n = 10;
            int[] fib = new int[n];

            fib[0] = 0;
            if (n > 1) fib[1] = 1;

            for (int i = 2; i < n; i++)
            {
                fib[i] = fib[i - 1] + fib[i - 2];
            }

            for (int i = n - 1; i >= 0; i--)
            {
                Console.Write(fib[i] + " ");
            }

            //Task 8
            int height = 4;
            int width = 6;

            Console.WriteLine("Zigzag Star Pattern:");

            for (int i = 0; i < height; i++)
            {
                for (int j = 0; j < width; j++)
                {
                    if ((i + j) % 2 == 0)
                    {
                        Console.Write("* ");
                    }
                    else
                    {
                        Console.Write("  ");
                    }
                }
                Console.WriteLine();
            }

            //Task 9
            Console.Write("Enter a number: ");
            int number = Convert.ToInt32(Console.ReadLine());

            int digitCount = number.ToString().Length;
            Console.WriteLine($"Total digits: {digitCount}");

            //Task 10
            int n = 5;

            Console.WriteLine("Diamond Pattern with Numbers:");

            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j <= 2 * (n - i); j++)
                    Console.Write(" ");

                for (int j = 1; j <= i; j++)
                    Console.Write(j);

                for (int j = i - 1; j >= 1; j--)
                    Console.Write(j);

                Console.WriteLine();
            }

            for (int i = n - 1; i >= 1; i--)
            {
                for (int j = 1; j <= 2 * (n - i); j++)
                    Console.Write(" ");

                for (int j = 1; j <= i; j++)
                    Console.Write(j);

                for (int j = i - 1; j >= 1; j--)
                    Console.Write(j);

                Console.WriteLine();
            }


        }

        //used for task 2
        static bool IsPerfectNumber(int number)
        {
            if (number < 2) return false;

            int sum = 0;
            for (int i = 1; i <= number / 2; i++)
            {
                if (number % i == 0)
                {
                    sum += i;
                }
            }
            return sum == number;
        }

        //used for task 6
        static bool IsArmstrongNumber(int number)
        {
            int original = number;
            int sum = 0;

            while (number > 0)
            {
                int digit = number % 10;
                sum += digit * digit * digit;
                number /= 10;
            }

            return sum == original;
        }
    }
}
