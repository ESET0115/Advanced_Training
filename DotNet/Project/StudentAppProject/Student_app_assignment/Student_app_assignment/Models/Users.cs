using System.ComponentModel.DataAnnotations;

namespace Student_app_assignment.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [MaxLength(20)]
        public string Role { get; set; } = "User";
    }
}
