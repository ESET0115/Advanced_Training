using LibraryManagementAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementAPI.Data.Repository
{
    public class Books
    {
        [Key]
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }

        [ForeignKey("Author")]
        public int AuthorId { get; set; }
        private Author? Author { get; set; } = null;
    }
}
