using Microsoft.EntityFrameworkCore;
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
                Assert.True(result.Succeeded);
                Assert.NotNull(result.Shift);
                Assert.NotNull(result.Shift.ShiftID);
                Assert.Equal("Test User", result.Shift.EmployeeName);
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
        public async Task CreateShiftAsync_Should_Fail_When_Overlap()
        {
            // Arrange
            var dbName = Guid.NewGuid().ToString();
            var employeeId = Guid.NewGuid();
            var baseTime = DateTime.Now;

            using (var context = GetDbContext(dbName))
            {
                context.Users.Add(new ApplicationUser { Id = employeeId, PersonName = "U1" });
                context.Shifts.Add(new Shift
                {
                    ShiftID = Guid.NewGuid(),
                    EmployeeID = employeeId,
                    StartTime = baseTime.AddHours(10),
                    EndTime = baseTime.AddHours(18)
                });
                await context.SaveChangesAsync();
            }

            var requestDto = new ShiftRequestDTO
            {
                EmployeeID = employeeId,
                StartTime = baseTime.AddHours(17),
                EndTime = baseTime.AddHours(20)
            };

            // Act
            using (var context = GetDbContext(dbName))
            {
                var service = new ShiftService(context);
                var result = await service.CreateShiftAsync(requestDto);

                // Assert
                Assert.False(result.Succeeded);
                Assert.Equal("Shift overlaps with an existing shift", result.Error);
            }
        }

        [Fact]
        public async Task UpdateShiftAsync_Should_Fail_When_Overlap_With_Other_Shift()
        {
            // Arrange
            var dbName = Guid.NewGuid().ToString();
            var employeeId = Guid.NewGuid();
            var baseTime = DateTime.Now;
            var shift1Id = Guid.NewGuid();
            var shift2Id = Guid.NewGuid();

            using (var context = GetDbContext(dbName))
            {
                context.Users.Add(new ApplicationUser { Id = employeeId, PersonName = "U1" });
                context.Shifts.Add(new Shift { ShiftID = shift1Id, EmployeeID = employeeId, StartTime = baseTime.AddHours(10), EndTime = baseTime.AddHours(14) });
                context.Shifts.Add(new Shift { ShiftID = shift2Id, EmployeeID = employeeId, StartTime = baseTime.AddHours(16), EndTime = baseTime.AddHours(20) });

                await context.SaveChangesAsync();
            }

            var updateDto = new ShiftRequestDTO
            {
                ShiftID = shift2Id,
                EmployeeID = employeeId,
                StartTime = baseTime.AddHours(13),
                EndTime = baseTime.AddHours(17)
            };

            // Act
            using (var context = GetDbContext(dbName))
            {
                var service = new ShiftService(context);
                var result = await service.UpdateShiftAsync(shift2Id, updateDto);

                // Assert
                Assert.False(result.Succeeded);
                Assert.Contains("overlaps", result.Error);
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