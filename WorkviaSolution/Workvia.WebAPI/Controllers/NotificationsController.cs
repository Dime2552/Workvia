using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workvia.Core.DTO.Notifications;
using Workvia.Core.ServiceContracts;

namespace Workvia.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        /// <summary>
        /// Get all notifications (For all users)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationResponseDTO>>> GetNotifications()
        {
            var notifications = await _notificationService.GetAllNotificationsAsync();
            return Ok(notifications);
        }

        /// <summary>
        /// Create new notification (Only for Admins)
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<NotificationResponseDTO>> PostNotification(NotificationCreateDTO dto)
        {
            var result = await _notificationService.CreateNotificationAsync(dto);
            return Ok(result);
        }

        /// <summary>
        /// Delete notification by id (Only for Admins)
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            var success = await _notificationService.DeleteNotificationAsync(id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
