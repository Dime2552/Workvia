using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using Workvia.Core.ServiceContracts;
using Workvia.Infrastructure.DatabaseContext;

namespace Workvia.Infrastructure.Services
{
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<byte[]> GenerateExcelReportAsync(DateTime startDate, DateTime endDate)
        {
            var shifts = await _context.Shifts
                .Include(s => s.Employee)
                .Where(s => s.StartTime >= startDate && s.EndTime <= endDate)
                .OrderBy(s => s.StartTime)
                .ToListAsync();

            using var workbook = new XLWorkbook();

            var wsShifts = workbook.Worksheets.Add("All shifts");
            wsShifts.Cell(1, 1).Value = "Employee name";
            wsShifts.Cell(1, 2).Value = "Email";
            wsShifts.Cell(1, 3).Value = "Shift start";
            wsShifts.Cell(1, 4).Value = "Shift end";
            wsShifts.Cell(1, 5).Value = "Hours worked";

            var headerRow = wsShifts.Row(1);
            headerRow.Style.Font.Bold = true;
            headerRow.Style.Fill.BackgroundColor = XLColor.LightGray;

            int row = 2;
            foreach (var shift in shifts)
            {
                var hours = (shift.EndTime - shift.StartTime).TotalHours;

                wsShifts.Cell(row, 1).Value = shift.Employee?.PersonName ?? "Unknown";
                wsShifts.Cell(row, 2).Value = shift.Employee?.Email ?? "Unknown";
                wsShifts.Cell(row, 3).Value = shift.StartTime.ToString("dd.MM.yyyy HH:mm");
                wsShifts.Cell(row, 4).Value = shift.EndTime.ToString("dd.MM.yyyy HH:mm");
                wsShifts.Cell(row, 5).Value = Math.Round(hours, 2);
                row++;
            }
            wsShifts.Columns().AdjustToContents();

            var wsSummary = workbook.Worksheets.Add("Emploee summary");
            wsSummary.Cell(1, 1).Value = "Employee name";
            wsSummary.Cell(1, 2).Value = "Total hours";

            var summaryHeader = wsSummary.Row(1);
            summaryHeader.Style.Font.Bold = true;
            summaryHeader.Style.Fill.BackgroundColor = XLColor.LightBlue;

            var summary = shifts
                .GroupBy(s => s.Employee?.PersonName ?? "Unknown")
                .Select(g => new {
                    Name = g.Key,
                    TotalHours = g.Sum(s => (s.EndTime - s.StartTime).TotalHours)
                })
                .OrderByDescending(x => x.TotalHours)
                .ToList();

            int sumRow = 2;
            foreach (var item in summary)
            {
                wsSummary.Cell(sumRow, 1).Value = item.Name;
                wsSummary.Cell(sumRow, 2).Value = Math.Round(item.TotalHours, 2);
                sumRow++;
            }
            wsSummary.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            return stream.ToArray();
        }
    }
}