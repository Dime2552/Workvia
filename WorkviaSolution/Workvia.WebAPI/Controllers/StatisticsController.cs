using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Workvia.Core.DTO.Stats;
using Workvia.Core.ServiceContracts;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        /// <summary>
        /// Get shifts count per day of week
        /// </summary>
        /// <returns></returns>
        [HttpGet("shifts-per-day")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ShiftsPerDayDTO>>> GetShiftsPerDay()
        {
            var result = await _statisticsService.GetShiftsPerDayOfWeekAsync();
            return Ok(result);
        }

        /// <summary>
        /// Get total worked hours by all employees
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        [HttpGet("total-hours")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<double>> GetTotalHours([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (start > end)
                return BadRequest("Start date must be before end date");

            var result = await _statisticsService.GetTotalHoursWorkedAsync(start, end);
            return Ok(result);
        }

        /// <summary>
        /// Get top 5 employees by worked hours
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        [HttpGet("top-employees")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<TopEmployeeStatsDTO>>> GetTopEmployees([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (start > end)
                return BadRequest("Start date must be before end date");

            var result = await _statisticsService.GetTopEmployeesByHoursAsync(start, end);
            return Ok(result);
        }

        /// <summary>
        /// Get worked hours for current logged-in user
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        [HttpGet("my-hours")]
        public async Task<ActionResult<double>> GetMyHours([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (start > end)
                return BadRequest("Start date must be before end date");

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
            {
                return Unauthorized("User ID not found in token");
            }

            var result = await _statisticsService.GetEmployeeHoursAsync(userId, start, end);
            return Ok(result);
        }
    }
}
