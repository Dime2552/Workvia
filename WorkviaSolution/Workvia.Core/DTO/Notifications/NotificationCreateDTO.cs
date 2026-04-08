using System.ComponentModel.DataAnnotations;

namespace Workvia.Core.DTO.Notifications
{
    public class NotificationCreateDTO
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message is required")]
        public string Message { get; set; } = string.Empty;
    }
}
