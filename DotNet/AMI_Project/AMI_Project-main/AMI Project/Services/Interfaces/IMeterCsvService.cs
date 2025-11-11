//using Microsoft.AspNetCore.Http;

//public interface IMeterCsvService
//{
//    Task<MeterUploadResultDto> UploadCsvAsync(IFormFile file);
//}



using AMI_Project.DTOs.Meters;
using AMI_Project.Models;

namespace AMI_Project.Services.Interfaces
{
    public interface IMeterCsvService
    {
        Task<IEnumerable<Meter>> UploadAndImportAsync(MeterUploadResultDto dto, CancellationToken ct);
    }
}