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
        [Required]
        public Guid EmployeeID { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
    }
}
