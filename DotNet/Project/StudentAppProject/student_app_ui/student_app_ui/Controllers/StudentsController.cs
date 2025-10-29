using Microsoft.AspNetCore.Mvc;

namespace student_app_ui.Controllers
{
    public class StudentsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult EditModal()
        {
            return PartialView("_EditModal");
        }
        public IActionResult CourseListPartial()
        {
            return PartialView("_CourseListPartial");
        }
    }
}
