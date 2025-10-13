using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment1
{
    internal class Order
    {
        public required int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int Amount { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
