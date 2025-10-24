using Microsoft.AspNetCore.Mvc;
using Students_Database.Models;

namespace Students_Database.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        //private static readonly string[] Summaries = new[]
        //{
        //    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        //};

        private readonly CollageDbContext _dbcontext;

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, CollageDbContext dbcontext)
        {
            _dbcontext = dbcontext;
            _logger = logger;
        }

        [HttpGet(Name = "GetStudent")]
        public IEnumerable<Student> Get()
        {
            return _dbcontext.Students.ToList();
        }
    }
}
