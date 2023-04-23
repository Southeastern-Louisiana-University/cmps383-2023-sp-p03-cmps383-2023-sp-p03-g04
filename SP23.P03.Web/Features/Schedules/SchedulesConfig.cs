using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SP23.P03.Web.Features.Schedules;

public class SchedulesConfiguration : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {

        builder.HasKey(schedule => schedule.Id);

        builder
            .HasOne(schedule => schedule.Train)
            .WithMany(scheduledTrain => scheduledTrain.Schedules)
            .HasForeignKey(schedule => schedule.TrainsId)
            .OnDelete(DeleteBehavior.Restrict);


        builder
            .HasOne(schedule => schedule.ScheduledTrain)
            .WithMany(scheduledTrain => scheduledTrain.Schedules)
            .HasForeignKey(schedule => schedule.ScheduledTrainId)
            .OnDelete(DeleteBehavior.Restrict);


    }
}