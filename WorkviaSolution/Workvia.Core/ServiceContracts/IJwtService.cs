using System;
using System.Collections.Generic;
using System.Text;
using Workvia.Core.DTO;
using Workvia.Core.Identity;

namespace Workvia.Core.ServiceContracts
{
    public interface IJwtService
    {
        AuthenticationResponse CreateJwt(ApplicationUser user, string role);
    }
}
