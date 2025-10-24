using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementAPI.Models
{
    public class Book
    {
        [Key]
        public int BookId { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Genre { get; set; }

        [ForeignKey("Author")]
        public int AuthorId { get; set; }

        // Make navigation property public and virtual for EF proxying/loading
        public virtual Author? Author { get; set; }
    }
}


