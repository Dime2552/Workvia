using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Workvia.Core.DTO;
using Workvia.Core.ServiceContracts;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AccountController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        /// <summary>
        /// Register new user
        /// </summary>
        /// <param name="registerDTO"></param>
        /// <returns></returns>
        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDTO>> PostRegister(RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
                return Problem(string.Join("|", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));

            var result = await _authService.RegisterAsync(registerDTO);

            if (result.Succeeded)
                return Ok(result.User);

            return Problem(string.Join("|", result.Errors));
        }

        /// <summary>
        /// Login user
        /// </summary>
        /// <param name="loginDTO"></param>
        /// <returns></returns>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationResponse>> PostLogin(LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return Problem(string.Join("|", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));

            var result = await _authService.LoginAsync(loginDTO);

            if (result.Succeeded && result.AuthResponse != null)
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = result.AuthResponse.Expiration
                };
                Response.Cookies.Append("access_token", result.AuthResponse.Token!, cookieOptions);

                result.AuthResponse.Token = null;

                return Ok(result.AuthResponse);
            }

            return BadRequest(result.Error);
        }

        /// <summary>
        /// Logout
        /// </summary>
        /// <returns></returns>
        [HttpGet("logout")]
        [AllowAnonymous]
        public async Task<IActionResult> GetLogout()
        {
            await _authService.LogoutAsync();

            Response.Cookies.Delete("access_token", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return NoContent();
        }

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUpdate(Guid id, UserDTO userDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (id != userDTO.Id)
                return BadRequest();

            var result = await _userService.UpdateUserAsync(id, userDTO);

            if (!result.Succeeded)
                return BadRequest(string.Join(" | ", result.Errors));

            return Ok();
        }

        /// <summary>
        /// Change user password
        /// </summary>
        /// <param name="changePasswordDTO"></param>
        /// <returns></returns>
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePasswordDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(string.Join("|", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !Guid.TryParse(userIdClaim, out Guid userId))
                return Unauthorized("User ID not found in token");

            var result = await _userService.ChangePasswordAsync(userId, changePasswordDTO);

            if (!result.Succeeded)
                return BadRequest(string.Join("|", result.Errors));

            return Ok();
        }

        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await _userService.DeleteUserAsync(id);

            if (!result.Succeeded)
                return BadRequest(string.Join(" | ", result.Errors));

            return Ok();
        }

        /// <summary>
        /// Is email already registered
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> IsEmailAlreadyRegister(string email)
        {
            bool isRegistered = await _userService.IsEmailRegisteredAsync(email);
            return Ok(isRegistered);
        }
    }
}
