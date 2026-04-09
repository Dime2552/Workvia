namespace Workvia.Core.ServiceContracts
{
    public interface IReportService
    {
        Task<byte[]> GenerateExcelReportAsync(DateTime startDate, DateTime endDate);
    }
}
