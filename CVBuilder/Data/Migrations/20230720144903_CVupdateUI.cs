using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CVBuilder.Data.Migrations
{
    public partial class CVupdateUI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Achievement",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "EducationLevel",
                table: "CVs");

            migrationBuilder.DropColumn(
                name: "EducationName",
                table: "CVs");

            migrationBuilder.RenameColumn(
                name: "EMail",
                table: "CVs",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "Responsibility",
                table: "CVs",
                newName: "University");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "CVs",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "CVs",
                newName: "Jobtitle");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "CVs",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "InstituteName",
                table: "CVs",
                newName: "Degree");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "CVs",
                newName: "Company");

            migrationBuilder.AddColumn<int>(
                name: "GraduationYear",
                table: "CVs",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GraduationYear",
                table: "CVs");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "CVs",
                newName: "EMail");

            migrationBuilder.RenameColumn(
                name: "University",
                table: "CVs",
                newName: "Responsibility");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "CVs",
                newName: "Position");

            migrationBuilder.RenameColumn(
                name: "Jobtitle",
                table: "CVs",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "CVs",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Degree",
                table: "CVs",
                newName: "InstituteName");

            migrationBuilder.RenameColumn(
                name: "Company",
                table: "CVs",
                newName: "FirstName");

            migrationBuilder.AddColumn<string>(
                name: "Achievement",
                table: "CVs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "CVs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EducationLevel",
                table: "CVs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EducationName",
                table: "CVs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
