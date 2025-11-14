using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workvia.Core.Entities
{
    public class Shift
    {
        [Key]
        public Guid ShiftID { get; set; }

        [Required(ErrorMessage = "Employee id can`t be blank")]
        public Guid EmployeeID { get; set; }

        // Add data fields validation
        [Required(ErrorMessage = "Start time can`t be blank")]
        public DateTime StartTime { get; set; }

        [Required(ErrorMessage = "End time can`t be blank")]
        public DateTime EndTime { get; set; }
    }
}
