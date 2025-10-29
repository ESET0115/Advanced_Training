using Microsoft.AspNetCore.Mvc;

namespace CollageApp_View.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Student()
        {
            return View();
        }
    }
}
