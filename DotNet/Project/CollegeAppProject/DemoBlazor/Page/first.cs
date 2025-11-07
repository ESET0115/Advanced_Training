using DataAccess;
using Microsoft.AspNetCore.Components;

namespace DemoBlazor.Page
{
    public class first : ComponentBase
    {
        public IEnumerable<Employee> Employees { get; set; }

        protected override Task OnInitializedAsync()
        {
            LoadEmployees();
            return base.OnInitializedAsync();
        }

        private void LoadEmployees()
        {
            Employees = new List<Employee>
            {
                new Employee { Id = 1, Name = "Alice Johnson", Position = "Software Engineer" },
                new Employee { Id = 2, Name = "Bob Smith", Position = "Project Manager" },
                new Employee { Id = 3, Name = "Charlie Brown", Position = "Designer" }
            };
        }
    }
}
