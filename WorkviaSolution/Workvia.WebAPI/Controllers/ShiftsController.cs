using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workvia.Core.DTO;
using Workvia.Core.ServiceContracts;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftsController : ControllerBase
    {
        private readonly IShiftService _shiftService;

        public ShiftsController(IShiftService shiftService)
        {
            _shiftService = shiftService;
        }

        /// <summary>
        /// Get all shifts
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ShiftResponseDTO>>> GetShifts()
        {
            var shifts = await _shiftService.GetAllShiftsAsync();
            return Ok(shifts);
        }

        /// <summary>
        /// Get all shifts of specified employee
        /// </summary>
        [HttpGet("employee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<ShiftResponseDTO>>> GetShiftsByEmployee(Guid employeeId)
        {
            var shifts = await _shiftService.GetShiftsByEmployeeAsync(employeeId);
            return Ok(shifts);
        }

        /// <summary>
        /// Get shift details
        /// </summary>
        [HttpGet("details/{id}")]
        public async Task<ActionResult<ShiftResponseDTO>> GetShiftById(Guid id)
        {
            var shift = await _shiftService.GetShiftByIdAsync(id);
            if (shift == null)
                return NotFound();
            return Ok(shift);
        }

        /// <summary>
        /// Update shift
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutShift(Guid id, ShiftRequestDTO shiftDTO)
        {
            var result = await _shiftService.UpdateShiftAsync(id, shiftDTO);

            if (!result.Succeeded)
            {
                if (result.Error == "Shift not found")
                    return NotFound();
                if (result.Error == "Mismatch ID")
                    return BadRequest();

                return Conflict(new { title = "Overlap Error", detail = result.Error });
            }

            return NoContent();
        }

        /// <summary>
        /// Add new shift
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ShiftResponseDTO>> PostShift(ShiftRequestDTO shiftRequestDTO)
        {
            var result = await _shiftService.CreateShiftAsync(shiftRequestDTO);

            if (!result.Succeeded)
            {
                return Conflict(new { title = "Overlap Error", detail = result.Error });
            }

            return CreatedAtAction(nameof(GetShiftById), new { id = result.Shift!.ShiftID }, result.Shift);
        }

        /// <summary>
        /// Delete shift
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteShift(Guid id)
        {
            var success = await _shiftService.DeleteShiftAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}