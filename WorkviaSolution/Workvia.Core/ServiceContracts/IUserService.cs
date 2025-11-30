using Workvia.Core.DTO;

namespace Workvia.Core.ServiceContracts
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetEmployeesAsync();
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(Guid id, UserDTO userDTO);
        Task<(bool Succeeded, string[] Errors)> ChangePasswordAsync(Guid userId, ChangePasswordDTO changePasswordDTO);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(Guid id);
        Task<bool> IsEmailRegisteredAsync(string email);
    }
}
