using Workvia.Core.DTO.Notifications;

namespace Workvia.Core.ServiceContracts
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationResponseDTO>> GetAllNotificationsAsync();
        Task<NotificationResponseDTO> CreateNotificationAsync(NotificationCreateDTO dto);
        Task<bool> DeleteNotificationAsync(Guid id);
    }
}
