using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment1
{
    internal class Student
    {
        public required int Id { get; set; }
        public string Name { get; set; }
        public string Course { get; set; }
        public int Marks { get; set; }
        public string City { get; set; }
    }
}
