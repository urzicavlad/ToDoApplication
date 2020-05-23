using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDoApplication.Migrations
{
    public partial class InitializeMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Added = table.Column<DateTime>(nullable: false),
                    Deadline = table.Column<DateTime>(nullable: false),
                    Importance = table.Column<int>(nullable: false),
                    State = table.Column<int>(nullable: false),
                    ClosedAt = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(nullable: true),
                    Important = table.Column<bool>(nullable: false),
                    TaskId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Added", "ClosedAt", "Deadline", "Description", "Importance", "State", "Title" },
                values: new object[] { 1L, new DateTime(2020, 5, 23, 10, 7, 57, 183, DateTimeKind.Local).AddTicks(2440), null, new DateTime(2020, 5, 25, 10, 7, 57, 185, DateTimeKind.Local).AddTicks(9729), "Descritpion", 2, 1, "Task 1" });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_TaskId",
                table: "Comments",
                column: "TaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
