using System;
using System.Collections.Generic;
using System.Text;

namespace Workvia.Core.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
    }
}
