using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practice_BoilerPlate.Migrations
{
    /// <inheritdoc />
    public partial class addfieldtomdeol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "FileUploads",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "FileUploads",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "FileUploads",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "FileUploads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "FileUploads",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "FileUploads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "FileUploads",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "FileUploads",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "FileUploads");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "FileUploads");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "FileUploads");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "FileUploads");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "FileUploads");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "FileUploads");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "FileUploads");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "FileUploads");
        }
    }
}
