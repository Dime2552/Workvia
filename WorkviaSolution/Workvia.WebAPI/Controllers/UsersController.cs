using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Workvia.Core.DTO;
using Workvia.Core.Entities;
using Workvia.Core.Identity;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Get all employees
        /// </summary>
        /// <returns></returns>
        [HttpGet("employees")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetEmployees()
        {
            var applicationUsers = await _userManager.GetUsersInRoleAsync("User");

            IList<UserDTO> result = new List<UserDTO>();

            foreach (var applicationUser in applicationUsers)
            {
                result.Add(new UserDTO { Email = applicationUser.Email, Id = applicationUser.Id, Name = applicationUser.PersonName });
            }

            return Ok(result);
        }
    }
}
