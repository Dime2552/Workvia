using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Workvia.Core.Entities;
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

        // GET: api/Shifts
        /// <summary>
        /// Get all shifts
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shift>>> GetShifts()
        {
            var shifts = await _context.Shifts.ToListAsync();

            if (shifts == null)
            {
                return NotFound();
            }

            return shifts;
        }

        // GET: api/Shifts/5
        /// <summary>
        /// Get all shifts of specified employee
        /// </summary>
        /// <param name="emploeeId"></param>
        /// <returns></returns>
        [HttpGet("{emploeeId}")]
        public async Task<ActionResult<IEnumerable<Shift>>> GetShift(Guid emploeeId)
        {
            var shifts = await _context.Shifts.Where(shift => shift.EmployeeID == emploeeId).ToListAsync();

            if (shifts == null)
            {
                return NotFound();
            }

            return shifts;
        }

        // PUT: api/Shifts/5
        /// <summary>
        /// Update shift
        /// </summary>
        /// <param name="id">Guid of specified shift</param>
        /// <param name="shift">New shift data</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShift(Guid id, Shift shift)
        {
            if (id != shift.ShiftID)
            {
                return BadRequest();
            }

            _context.Entry(shift).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShiftExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Shifts
        /// <summary>
        /// Add new shift
        /// </summary>
        /// <param name="shift"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Shift>> PostShift(Shift shift)
        {
            if (_context.Shifts == null)
            {
                return BadRequest();
            }
            _context.Shifts.Add(shift);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShift", new { id = shift.ShiftID }, shift);
        }

        // DELETE: api/Shifts/5
        /// <summary>
        /// Delete shift by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
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