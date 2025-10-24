using LibraryManagementAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementAPI.Data.Repository
{
    public class Authors
    {
        [Key]
        public int AuthorID { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        private ICollection<Book>? Books { get; set; } = null;
    }
}
