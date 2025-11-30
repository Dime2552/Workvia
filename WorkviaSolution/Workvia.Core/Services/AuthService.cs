using Microsoft.AspNetCore.Identity;
using Workvia.Core.DTO;
using Workvia.Core.Identity;
using Workvia.Core.ServiceContracts;

namespace Workvia.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtService _jwtService;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        public async Task<(bool Succeeded, string[] Errors, UserDTO? User)> RegisterAsync(RegisterDTO registerDTO)
        {
            ApplicationUser user = new ApplicationUser()
            {
                PersonName = registerDTO.PersonName,
                Email = registerDTO.Email,
                UserName = registerDTO.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded)
            {
                return (false, result.Errors.Select(e => e.Description).ToArray(), null);
            }

            // Add role
            string role = registerDTO.IsAdmin ? "Admin" : "User";
            await _userManager.AddToRoleAsync(user, role);

            return (true, Array.Empty<string>(), new UserDTO { Id = user.Id, Email = user.Email, Name = user.PersonName });
        }

        public async Task<(bool Succeeded, string Error, AuthenticationResponse? AuthResponse)> LoginAsync(LoginDTO loginDTO)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDTO.Email, loginDTO.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return (false, "Invalid email or password", null);
            }

            ApplicationUser? user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                return (false, "User not found", null);
            }

            var roles = await _userManager.GetRolesAsync(user);
            var authResponse = _jwtService.CreateJwt(user, roles.FirstOrDefault() ?? "User");

            return (true, string.Empty, authResponse);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
