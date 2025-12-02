using System;
using System.Collections.Generic;
using System.Text;

namespace Workvia.Core.DTO.Stats
{
    public class ShiftsPerDayDTO
    {
        public string DayOfWeek { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
