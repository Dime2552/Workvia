using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Workvia.Core.DTO
{
    public class ShiftRequestDTO
    {
        public Guid? ShiftID { get; set; }

        [Required(ErrorMessage = "Employee id can`t be blank")]
        public Guid EmployeeID { get; set; }

        // Add data fields validation
        [Required(ErrorMessage = "Start time can`t be blank")]
        public DateTime StartTime { get; set; }

        [Required(ErrorMessage = "End time can`t be blank")]
        public DateTime EndTime { get; set; }
    }
}
