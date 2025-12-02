using Workvia.Core.DTO.Stats;

namespace Workvia.Core.ServiceContracts
{
    public interface IStatisticsService
    {
        Task<IEnumerable<ShiftsPerDayDTO>> GetShiftsPerDayOfWeekAsync();

        Task<double> GetTotalHoursWorkedAsync(DateTime startDate, DateTime endDate);

        Task<IEnumerable<TopEmployeeStatsDTO>> GetTopEmployeesByHoursAsync(DateTime startDate, DateTime endDate);

        Task<double> GetEmployeeHoursAsync(Guid employeeId, DateTime startDate, DateTime endDate);
    }
}
