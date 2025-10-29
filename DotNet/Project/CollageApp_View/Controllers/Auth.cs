using Microsoft.AspNetCore.Mvc;

namespace CollageApp_View.Controllers
{
    public class Auth : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
