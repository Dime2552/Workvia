using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.CodeCoverage;
using System;
using System.Collections.Generic;
using System.Text;
using Workvia.Core.DTO;
using Workvia.Core.Entities;
using Workvia.Core.Identity;
using Workvia.Infrastructure.DatabaseContext;
using Workvia.Infrastructure.Services;

namespace Workvia.Tests
{
    public class ShiftServiceTests
    {
        private ApplicationDbContext GetDbContext(string dbName)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task CreateShiftAsync_Should_AddShiftToDatabase()
        {
            // Arrange
            var dbName = Guid.NewGuid().ToString();
            var employeeId = Guid.NewGuid();

            using (var context = GetDbContext(dbName))
            {
                context.Users.Add(new ApplicationUser
                {
                    Id = employeeId,
                    PersonName = "Test User",
                    Email = "test@test.com"
                });
                await context.SaveChangesAsync();
            }

            var requestDto = new ShiftRequestDTO
            {
                EmployeeID = employeeId,
                StartTime = DateTime.Now,
                EndTime = DateTime.Now.AddHours(8)
            };

            // Act
            using (var context = GetDbContext(dbName))
            {
                var service = new ShiftService(context);
                var result = await service.CreateShiftAsync(requestDto);

                // Assert
                Assert.NotNull(result);
                Assert.NotNull(result.ShiftID);
                Assert.Equal("Test User", result.EmployeeName);
            }

            // Assert
            using (var context = GetDbContext(dbName))
            {
                var shiftInDb = await context.Shifts.FirstOrDefaultAsync();
                Assert.NotNull(shiftInDb);
                Assert.Equal(employeeId, shiftInDb.EmployeeID);
            }
        }

        [Fact]
        public async Task UpdateShiftAsync_Should_ReturnError_When_IdMismatch()
        {
            // Arrange
            var dbName = Guid.NewGuid().ToString();
            using (var context = GetDbContext(dbName))
            {
                var service = new ShiftService(context);
                var shiftId = Guid.NewGuid();
                var requestDto = new ShiftRequestDTO
                {
                    ShiftID = Guid.NewGuid(),
                    EmployeeID = Guid.NewGuid(),
                    StartTime = DateTime.Now,
                    EndTime = DateTime.Now.AddHours(5)
                };

                // Act
                var result = await service.UpdateShiftAsync(shiftId, requestDto);

                // Assert
                Assert.False(result.Succeeded);
                Assert.Equal("Mismatch ID", result.Error);
            }
        }

        [Fact]
        public async Task UpdateShiftAsync_Should_Update_When_Valid()
        {
            // Arrange
            var dbName = Guid.NewGuid().ToString();
            var shiftId = Guid.NewGuid();
            var initialEmployeeId = Guid.NewGuid();

            using (var context = GetDbContext(dbName))
            {
                context.Shifts.Add(new Shift
                {
                    ShiftID = shiftId,
                    EmployeeID = initialEmployeeId,
                    StartTime = DateTime.Now,
                    EndTime = DateTime.Now.AddHours(4)
                });
                await context.SaveChangesAsync();
            }

            var newEmployeeId = Guid.NewGuid();
            var updateDto = new ShiftRequestDTO
            {
                ShiftID = shiftId,
                EmployeeID = newEmployeeId,
                StartTime = DateTime.Now.AddDays(1),
                EndTime = DateTime.Now.AddDays(1).AddHours(8)
            };

            // Act
            using (var context = GetDbContext(dbName))
            {
                var service = new ShiftService(context);
                var result = await service.UpdateShiftAsync(shiftId, updateDto);

                Assert.True(result.Succeeded);
            }

            // Assert
            using (var context = GetDbContext(dbName))
            {
                var updatedShift = await context.Shifts.FindAsync(shiftId);
                Assert.Equal(newEmployeeId, updatedShift.EmployeeID);
                Assert.Equal(updateDto.StartTime, updatedShift.StartTime);
            }
        }

        [Fact]
        public async Task DeleteShiftAsync_Should_ReturnFalse_When_NotFound()
        {
            // Arrange
            var dbName = Guid.NewGuid().ToString();
            using (var context = GetDbContext(dbName))
            {
                var service = new ShiftService(context);

                // Act
                var result = await service.DeleteShiftAsync(Guid.NewGuid());

                // Assert
                Assert.False(result);
            }
        }
    }
}
