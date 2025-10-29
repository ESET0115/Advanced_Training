using Microsoft.AspNetCore.Mvc;

namespace student_app_ui.Controllers
{
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Logout() {
        return RedirectToAction("Login");
        }

    }
}
