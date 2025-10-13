using LINQ;
using System.Runtime.CompilerServices;

var games = new List<Games>
{
    new Games { Title = "The Legend of Zelda: Breath of the Wild", Genre = "Action-adventure", ReleaseYear = 2017, Rating = 9.5, Price = 59 },
    new Games { Title = "God of War", Genre = "Action-adventure", ReleaseYear = 2018, Rating = 9.3, Price = 49 },
    new Games { Title = "Red Dead Redemption 2", Genre = "Action-adventure", ReleaseYear = 2018, Rating = 9.7, Price = 69 },
    new Games { Title = "The Witcher 3: Wild Hunt", Genre = "RPG", ReleaseYear = 2015, Rating = 9.4, Price = 39 },
    new Games { Title = "Minecraft", Genre = "Sandbox", ReleaseYear = 2011, Rating = 9.0, Price = 26 },
    new Games { Title = "Fortnite", Genre = "Battle Royale", ReleaseYear = 2017, Rating = 8.5, Price = 0 },
    new Games { Title = "Among Us", Genre = "Party", ReleaseYear = 2018, Rating = 8.0, Price = 5 },
    new Games { Title = "Cyberpunk 2077", Genre = "RPG", ReleaseYear = 2020, Rating = 7.5, Price = 59 },
    new Games { Title = "Hades", Genre = "Roguelike", ReleaseYear = 2020, Rating = 9.2, Price = 24 },
    new Games { Title = "Animal Crossing: New Horizons", Genre = "Simulation", ReleaseYear = 2020, Rating = 9.1, Price = 59 }
};

var allgames = games.Select(n => n.Title);

foreach (var title in allgames)
{
    Console.WriteLine(title);
}



var genregames = games.Where(n => n.Genre == "RPG");

foreach (var item in genregames)
{
    Console.WriteLine(item.Title);
}



var modernGames = games.Any(n => n.ReleaseYear >= 2020);
Console.WriteLine(modernGames);



var sortbygames = games.OrderByDescending(n => n.ReleaseYear);

foreach (var item in sortbygames)
{
    Console.WriteLine($"{item.Title} -- {item.ReleaseYear}");
}



var avgPrice = games.Average(n => n.Price);
Console.WriteLine($"average game price: {avgPrice}");

var minPrice = games.Min(n => n.Price);
Console.WriteLine($"minimum game price: {minPrice}");

var maxPrice = games.Max(n => n.Price);
Console.WriteLine($"maximum game price: {maxPrice}");



var groupbygames = games.GroupBy(n => n.Genre);

foreach (var group in groupbygames)
{
    Console.WriteLine($"Genre - {group.Key}");
    foreach (var item in group)
    {
        Console.WriteLine($"----- {item.Title}");
    }
}