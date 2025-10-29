using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace student_app_ui.Controllers
{
    public class CoursesController : Controller
    {
      public IActionResult Index()
        {
            return View();
        }
        public IActionResult EditModal()
        {
            return PartialView("_CourseEditModal");
        }
        [AllowAnonymous]
        [HttpGet("/Courses/List")]
        public IActionResult List()
        {
            return View();
        }
    }
}
