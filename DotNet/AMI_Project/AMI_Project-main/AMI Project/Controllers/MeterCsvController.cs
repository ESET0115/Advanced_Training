//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//[ApiController]
//[Route("api/[controller]")]
//public class MeterCsvController : ControllerBase
//{
//    private readonly IMeterCsvService _csvService;
//    public MeterCsvController(IMeterCsvService csvService)
//    {
//        _csvService = csvService;
//    }

//    [HttpPost("upload")]
//    [Consumes("multipart/form-data")]
//    [ProducesResponseType(StatusCodes.Status200OK)]
//    [ProducesResponseType(StatusCodes.Status400BadRequest)]
//    public async Task<IActionResult> Upload([FromForm] IFormFile file)
//    {
//        if (file == null || file.Length == 0)
//            return BadRequest("CSV file is required");

//        try
//        {
//            var result = await _csvService.UploadCsvAsync(file);
//            return Ok(result);
//        }
//        catch (Exception ex)
//        {
//            return BadRequest(new { Message = ex.Message });
//        }
//    }
//}

using AMI_Project.DTOs.Meters;
using AMI_Project.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AMI_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeterCsvController : ControllerBase
    {
        private readonly IMeterCsvService _service;

        public MeterCsvController(IMeterCsvService service)
        {
            _service = service;
        }

        /// <summary>
        /// Uploads and imports meter data from CSV.
        /// </summary>
        /// <param name="dto">CSV file DTO</param>
        /// <returns>List of imported meters</returns>
        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload([FromForm] MeterUploadResultDto dto, CancellationToken ct)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var imported = await _service.UploadAndImportAsync(dto, ct);
                return Ok(new
                {
                    message = $"Successfully imported {imported.Count()} meters.",
                    data = imported
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
