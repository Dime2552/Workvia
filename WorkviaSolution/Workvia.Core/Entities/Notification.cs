using System;
using System.ComponentModel.DataAnnotations;

namespace Workvia.Core.Entities
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Title can't be blank")]
        public string Title { get; set; } = string.Empty; [Required(ErrorMessage = "Message can't be blank")]
        public string Message { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}