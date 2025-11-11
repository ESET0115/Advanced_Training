//public class MeterUploadResultDto
//{
//    public string Message { get; set; } = string.Empty;
//    public int Added { get; set; }
//    public int Updated { get; set; }
//}


using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AMI_Project.DTOs.Meters
{
    public class MeterUploadResultDto
    {
        [Required(ErrorMessage = "CSV file is required.")]
        public IFormFile CsvFile { get; set; } = default!;
    }
}