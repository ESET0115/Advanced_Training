using System.ComponentModel.DataAnnotations;

namespace LibraryManagementAPI.Models
{
    public class Author
    {
        [Required]
        public int AuthorID { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        private ICollection<Book>? Books { get; set; } = null;
    }
}