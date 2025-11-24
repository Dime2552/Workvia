using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Workvia.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddForeignKeyToShift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Shifts_EmployeeID",
                table: "Shifts",
                column: "EmployeeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Shifts_AspNetUsers_EmployeeID",
                table: "Shifts",
                column: "EmployeeID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shifts_AspNetUsers_EmployeeID",
                table: "Shifts");

            migrationBuilder.DropIndex(
                name: "IX_Shifts_EmployeeID",
                table: "Shifts");
        }
    }
}
