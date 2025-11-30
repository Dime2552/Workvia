using Workvia.Core.DTO;

namespace Workvia.Core.ServiceContracts
{
    public interface IShiftService
    {
        Task<IEnumerable<ShiftResponseDTO>> GetAllShiftsAsync();
        Task<IEnumerable<ShiftResponseDTO>> GetShiftsByEmployeeAsync(Guid employeeId);
        Task<ShiftResponseDTO?> GetShiftByIdAsync(Guid id);
        Task<ShiftResponseDTO> CreateShiftAsync(ShiftRequestDTO shiftRequestDTO);
        Task<(bool Succeeded, string Error)> UpdateShiftAsync(Guid id, ShiftRequestDTO shiftRequestDTO);
        Task<bool> DeleteShiftAsync(Guid id);
    }
}
