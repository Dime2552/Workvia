using System;
using System.Collections.Generic;
using System.Text;

namespace Workvia.Core.DTO
{
    public class AuthenticationResponse
    {
        public string? Token {  get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public string? PersonName { get; set; } = string.Empty;
        public string? Email {  get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }
}
