using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workvia.Core.DTO;
using Workvia.Core.ServiceContracts;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get all employees
        /// </summary>
        /// <returns></returns>
        [HttpGet("employees")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetEmployees()
        {
            var employees = await _userService.GetEmployeesAsync();
            return Ok(employees);
        }
    }
}
