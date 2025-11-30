using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Workvia.Core.DTO;
using Workvia.Core.Identity;
using Workvia.Core.ServiceContracts;

namespace Workvia.Core.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserDTO>> GetEmployeesAsync()
        {
            var applicationUsers = await _userManager.GetUsersInRoleAsync("User");
            return applicationUsers.Select(u => new UserDTO
            {
                Email = u.Email,
                Id = u.Id,
                Name = u.PersonName
            }).ToList();
        }

        public async Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(Guid id, UserDTO userDTO)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return (false, new[] { "User do not exist" });

            user.Email = userDTO.Email;
            user.UserName = userDTO.Email;
            user.PersonName = userDTO.Name;

            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded
                ? (true, Array.Empty<string>())
                : (false, result.Errors.Select(e => e.Description).ToArray());
        }

        public async Task<(bool Succeeded, string[] Errors)> ChangePasswordAsync(Guid userId, ChangePasswordDTO changePasswordDTO)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return (false, new[] { "User not found" });

            var result = await _userManager.ChangePasswordAsync(user, changePasswordDTO.CurrentPassword, changePasswordDTO.NewPassword);

            return result.Succeeded
                ? (true, Array.Empty<string>())
                : (false, result.Errors.Select(e => e.Description).ToArray());
        }

        public async Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return (false, new[] { "User do not exist" });

            var result = await _userManager.DeleteAsync(user);

            return result.Succeeded
                ? (true, Array.Empty<string>())
                : (false, result.Errors.Select(e => e.Description).ToArray());
        }

        public async Task<bool> IsEmailRegisteredAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user != null;
        }
    }
}
