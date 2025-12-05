using Microsoft.EntityFrameworkCore;
using Workvia.Core.DTO.Stats;
using Workvia.Core.ServiceContracts;
using Workvia.Infrastructure.DatabaseContext;

namespace Workvia.Infrastructure.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly ApplicationDbContext _context;

        public StatisticsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ShiftsPerDayDTO>> GetShiftsPerDayOfWeekAsync()
        {
            var endDate = DateTime.UtcNow;
            var startDate = endDate.AddMonths(-1);

            var shiftsDates = await _context.Shifts
                .Where(s => s.StartTime >= startDate && s.StartTime <= endDate)
                .Select(s => s.StartTime)
                .ToListAsync();

            var stats = shiftsDates
                .GroupBy(d => d.DayOfWeek)
                .Select(g => new ShiftsPerDayDTO
                {
                    DayOfWeek = g.Key.ToString(),
                    Count = g.Count()
                })
                .ToList();

            return stats;
        }

        public async Task<double> GetTotalHoursWorkedAsync(DateTime startDate, DateTime endDate)
        {
            var totalMinutes = await _context.Shifts
                .Where(s => s.StartTime >= startDate && s.EndTime <= endDate)
                .SumAsync(s => EF.Functions.DateDiffMinute(s.StartTime, s.EndTime));

            return Math.Round(totalMinutes / 60.0, 2);
        }

        public async Task<IEnumerable<TopEmployeeStatsDTO>> GetTopEmployeesByHoursAsync(DateTime startDate, DateTime endDate)
        {
            var result = await _context.Shifts
                .Where(s => s.StartTime >= startDate && s.EndTime <= endDate)
                .GroupBy(s => new { s.EmployeeID, s.Employee.PersonName })
                .Select(g => new
                {
                    EmployeeName = g.Key.PersonName ?? "Unknown",
                    TotalMinutes = g.Sum(x => EF.Functions.DateDiffMinute(x.StartTime, x.EndTime))
                })
                .OrderByDescending(x => x.TotalMinutes)
                .Take(5)
                .ToListAsync();

            return result.Select(x => new TopEmployeeStatsDTO
            {
                EmployeeName = x.EmployeeName,
                TotalHours = Math.Round(x.TotalMinutes / 60.0, 2)
            });
        }

        public async Task<double> GetEmployeeHoursAsync(Guid employeeId, DateTime startDate, DateTime endDate)
        {
            var totalMinutes = await _context.Shifts
                .Where(s => s.EmployeeID == employeeId && s.StartTime >= startDate && s.EndTime <= endDate)
                .SumAsync(s => EF.Functions.DateDiffMinute(s.StartTime, s.EndTime));

            return Math.Round(totalMinutes / 60.0, 2);
        }
    }
}