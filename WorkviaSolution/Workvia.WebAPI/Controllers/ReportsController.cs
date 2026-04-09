using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workvia.Core.ServiceContracts;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// Generate Excel report by period
        /// </summary>
        [HttpGet("excel")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetExcelReport([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (start > end)
                return BadRequest("Start date must be before end date");

            var fileBytes = await _reportService.GenerateExcelReportAsync(start, end);

            var fileName = $"Workvia_Report_{start:yyyyMMdd}_{end:yyyyMMdd}.xlsx";
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            return File(fileBytes, contentType, fileName);
        }
    }
}
