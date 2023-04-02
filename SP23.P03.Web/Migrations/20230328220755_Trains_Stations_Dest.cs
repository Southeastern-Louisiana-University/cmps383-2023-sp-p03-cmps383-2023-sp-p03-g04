using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SP23.P03.Web.Migrations
{
    /// <inheritdoc />
    public partial class TrainsStationsDest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Train_ArrivingStationId",
                table: "Train",
                column: "ArrivingStationId");

            migrationBuilder.CreateIndex(
                name: "IX_Train_DepartingStationId",
                table: "Train",
                column: "DepartingStationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Train_TrainStation_ArrivingStationId",
                table: "Train",
                column: "ArrivingStationId",
                principalTable: "TrainStation",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Train_TrainStation_DepartingStationId",
                table: "Train",
                column: "DepartingStationId",
                principalTable: "TrainStation",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Train_TrainStation_ArrivingStationId",
                table: "Train");

            migrationBuilder.DropForeignKey(
                name: "FK_Train_TrainStation_DepartingStationId",
                table: "Train");

            migrationBuilder.DropIndex(
                name: "IX_Train_ArrivingStationId",
                table: "Train");

            migrationBuilder.DropIndex(
                name: "IX_Train_DepartingStationId",
                table: "Train");
        }
    }
}
