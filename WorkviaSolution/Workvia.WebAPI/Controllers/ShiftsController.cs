using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Workvia.Core.DTO;
using Workvia.Core.Entities;
using Workvia.Core.Mappers;
using Workvia.Infrastructure.DatabaseContext;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShiftsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all shifts
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ShiftResponseDTO>>> GetShifts()
        {
            var shifts = await _context.Shifts
                .Include(s => s.Employee)
                .ToListAsync();

            return shifts.Select(s => s.ToResponseDTO()).ToList();
        }

        /// <summary>
        /// Get all shifts of specified employee
        /// </summary>
        [HttpGet("employee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<ShiftResponseDTO>>> GetShiftsByEmployee(Guid employeeId)
        {
            var shifts = await _context.Shifts
                .Where(shift => shift.EmployeeID == employeeId)
                .Include(s => s.Employee)
                .ToListAsync();

            return shifts.Select(s => s.ToResponseDTO()).ToList();
        }

        /// <summary>
        /// Get shift details
        /// </summary>
        [HttpGet("details/{id}")]
        public async Task<ActionResult<ShiftResponseDTO>> GetShiftById(Guid id)
        {
            var shift = await _context.Shifts
                .Include(s => s.Employee)
                .FirstOrDefaultAsync(s => s.ShiftID == id);

            if (shift == null)
            {
                return NotFound();
            }
            return shift.ToResponseDTO();
        }

        /// <summary>
        /// Update shift
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutShift(Guid id, ShiftRequestDTO shiftDTO)
        {
            if (id != shiftDTO.ShiftID)
            {
                return BadRequest();
            }

            var existingShift = await _context.Shifts.FindAsync(id);
            if (existingShift == null)
            {
                return NotFound();
            }

            existingShift.EmployeeID = shiftDTO.EmployeeID;
            existingShift.StartTime = shiftDTO.StartTime;
            existingShift.EndTime = shiftDTO.EndTime;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShiftExists(id))
                    return NotFound();
                else
                    throw;
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
            if (_context.Shifts == null)
            {
                return BadRequest("Entity set 'ApplicationDbContext.Shifts' is null.");
            }

            shiftRequestDTO.ShiftID = Guid.NewGuid();

            var shiftEntity = shiftRequestDTO.ToEntity();

            _context.Shifts.Add(shiftEntity);
            await _context.SaveChangesAsync();

            var employee = await _context.Users.FindAsync(shiftEntity.EmployeeID);
            shiftEntity.Employee = employee;

            return CreatedAtAction(nameof(GetShiftById), new { id = shiftEntity.ShiftID }, shiftEntity.ToResponseDTO());
        }

        /// <summary>
        /// Delete shift
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteShift(Guid id)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
            {
                return NotFound();
            }

            _context.Shifts.Remove(shift);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShiftExists(Guid id)
        {
            return _context.Shifts.Any(e => e.ShiftID == id);
        }
    }
}