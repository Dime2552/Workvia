using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Workvia.Core.DTO;
using Workvia.Core.Mappers;
using Workvia.Infrastructure.DatabaseContext;
using Workvia.Core.ServiceContracts;

namespace Workvia.Infrastructure.Services
{
    public class ShiftService : IShiftService
    {
        private readonly ApplicationDbContext _context;

        public ShiftService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ShiftResponseDTO>> GetAllShiftsAsync()
        {
            var shifts = await _context.Shifts
                .Include(s => s.Employee)
                .ToListAsync();

            return shifts.Select(s => s.ToResponseDTO()).ToList();
        }

        public async Task<IEnumerable<ShiftResponseDTO>> GetShiftsByEmployeeAsync(Guid employeeId)
        {
            var shifts = await _context.Shifts
                .Where(shift => shift.EmployeeID == employeeId)
                .Include(s => s.Employee)
                .ToListAsync();

            return shifts.Select(s => s.ToResponseDTO());
        }

        public async Task<ShiftResponseDTO?> GetShiftByIdAsync(Guid id)
        {
            var shift = await _context.Shifts
                .Include(s => s.Employee)
                .FirstOrDefaultAsync(s => s.ShiftID == id);

            return shift?.ToResponseDTO();
        }

        public async Task<(bool Succeeded, string Error, ShiftResponseDTO? Shift)> CreateShiftAsync(ShiftRequestDTO shiftRequestDTO)
        {
            // Перевірка на перетин
            if (await IsOverlapAsync(shiftRequestDTO.EmployeeID, shiftRequestDTO.StartTime, shiftRequestDTO.EndTime))
            {
                return (false, "Shift overlaps with an existing shift", null);
            }

            shiftRequestDTO.ShiftID = Guid.NewGuid();
            var shiftEntity = shiftRequestDTO.ToEntity();

            _context.Shifts.Add(shiftEntity);
            await _context.SaveChangesAsync();

            await _context.Entry(shiftEntity).Reference(s => s.Employee).LoadAsync();

            return (true, string.Empty, shiftEntity.ToResponseDTO());
        }

        public async Task<(bool Succeeded, string Error)> UpdateShiftAsync(Guid id, ShiftRequestDTO shiftDTO)
        {
            if (id != shiftDTO.ShiftID)
                return (false, "Mismatch ID");

            var existingShift = await _context.Shifts.FindAsync(id);
            if (existingShift == null)
                return (false, "Shift not found");

            if (await IsOverlapAsync(shiftDTO.EmployeeID, shiftDTO.StartTime, shiftDTO.EndTime, id))
            {
                return (false, "Shift overlaps with an existing shift");
            }

            existingShift.EmployeeID = shiftDTO.EmployeeID;
            existingShift.StartTime = shiftDTO.StartTime;
            existingShift.EndTime = shiftDTO.EndTime;

            try
            {
                await _context.SaveChangesAsync();
                return (true, string.Empty);
            }
            catch (DbUpdateConcurrencyException)
            {
                return (false, "Concurrency Error");
            }
        }

        public async Task<bool> DeleteShiftAsync(Guid id)
        {
            var shift = await _context.Shifts.FindAsync(id);
            if (shift == null)
                return false;

            _context.Shifts.Remove(shift);
            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<bool> IsOverlapAsync(Guid employeeId, DateTime start, DateTime end, Guid? excludeShiftId = null)
        {
            return await _context.Shifts.AnyAsync(s =>
                s.EmployeeID == employeeId &&
                s.ShiftID != excludeShiftId &&
                s.StartTime < end &&
                s.EndTime > start
            );
        }
    }
}
