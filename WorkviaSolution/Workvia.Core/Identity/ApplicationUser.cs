using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Workvia.Core.Identity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string? PersonName { get; set; }
    }
}
