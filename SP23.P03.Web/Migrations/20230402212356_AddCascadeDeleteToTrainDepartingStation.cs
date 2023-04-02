using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SP23.P03.Web.Migrations
{
    public partial class AddCascadeDeleteToTrainDepartingStation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Train
            DROP CONSTRAINT FK_Train_TrainStation_DepartingStationId;

            ALTER TABLE dbo.Train
            ADD CONSTRAINT FK_Train_TrainStation_DepartingStationId
            FOREIGN KEY (DepartingStationId)
            REFERENCES dbo.TrainStation (Id)
            ON DELETE CASCADE;
        ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            ALTER TABLE dbo.Train
            DROP CONSTRAINT FK_Train_TrainStation_DepartingStationId;

            ALTER TABLE dbo.Train
            ADD CONSTRAINT FK_Train_TrainStation_DepartingStationId
            FOREIGN KEY (DepartingStationId)
            REFERENCES dbo.TrainStation (Id);
        ");
        }
    }

}
