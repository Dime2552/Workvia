using Microsoft.EntityFrameworkCore;
using Workvia.Core.DTO.Notifications;
using Workvia.Core.Entities;
using Workvia.Core.ServiceContracts;
using Workvia.Infrastructure.DatabaseContext;

namespace Workvia.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext _context;

        public NotificationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NotificationResponseDTO>> GetAllNotificationsAsync()
        {
            var notifications = await _context.Notifications
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationResponseDTO
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    CreatedAt = n.CreatedAt
                }).ToListAsync();

            return notifications;
        }

        public async Task<NotificationResponseDTO> CreateNotificationAsync(NotificationCreateDTO dto)
        {
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return new NotificationResponseDTO
            {
                Id = notification.Id,
                Title = notification.Title,
                Message = notification.Message,
                CreatedAt = notification.CreatedAt
            };
        }

        public async Task<bool> DeleteNotificationAsync(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
            {
                return false;
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
