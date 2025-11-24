using System;
using System.Collections.Generic;
using System.Text;

namespace Workvia.Core.DTO
{
    public class ShiftResponseDTO
    {
        public Guid? ShiftID { get; set; }
        public Guid EmployeeID { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
