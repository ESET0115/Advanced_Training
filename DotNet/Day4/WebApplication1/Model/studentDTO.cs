using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class studentDTO
    {
        //public int studentId { get; set; }
        //public string name { get; set; }
        //public int age { get; set; }
        //public string email { get; set; }

        [ValidateNever]
       
        public int studentId { get; set; }

        [Required(ErrorMessage = "please enter the name")]
        [StringLength(100)]

        public string name { get; set; }

        [Range(10, 30)]
        public int age { get; set; }
        [EmailAddress(ErrorMessage = "Invalid Email Address")]

        public string email { get; set; }


        public string Password { get; set; }
        [Compare(nameof(Password), ErrorMessage = "Password and Confirm Password must match.")]

        public string ConfirmPassword { get; set; }

        public DateTime AdmissionDate { get; set; }
    }
}
