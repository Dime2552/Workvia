using System;
using System.Collections.Generic;
using System.Text;
using Workvia.Core.DTO;
using Workvia.Core.Entities;

namespace Workvia.Core.Mappers
{
    public static class ShiftMappingExtensions
    {
        public static ShiftRequestDTO ToRequestDTO(this Shift shift)
        {
            return new ShiftRequestDTO
            {
                ShiftID = shift.ShiftID,
                EmployeeID = shift.EmployeeID,
                StartTime = shift.StartTime,
                EndTime = shift.EndTime
            };
        }

        public static Shift ToEntity(this ShiftRequestDTO dto)
        {
            return new Shift
            {
                ShiftID = dto.ShiftID,
                EmployeeID = dto.EmployeeID,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime
            };
        }

        public static ShiftResponseDTO ToResponseDTO(this Shift shift)
        {
            return new ShiftResponseDTO
            {
                ShiftID = shift.ShiftID,
                EmployeeID = shift.EmployeeID,
                EmployeeName = shift.Employee != null ? $"{shift.Employee.PersonName}" : "Unknown",
                StartTime = shift.StartTime,
                EndTime = shift.EndTime
            };
        }
    }
}
