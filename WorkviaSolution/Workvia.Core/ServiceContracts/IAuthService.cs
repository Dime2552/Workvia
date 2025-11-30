using Workvia.Core.DTO;

namespace Workvia.Core.ServiceContracts
{
    public interface IAuthService
    {
        Task<(bool Succeeded, string[] Errors, UserDTO? User)> RegisterAsync(RegisterDTO registerDTO);
        Task<(bool Succeeded, string Error, AuthenticationResponse? AuthResponse)> LoginAsync(LoginDTO loginDTO);
        Task LogoutAsync();
    }
}
