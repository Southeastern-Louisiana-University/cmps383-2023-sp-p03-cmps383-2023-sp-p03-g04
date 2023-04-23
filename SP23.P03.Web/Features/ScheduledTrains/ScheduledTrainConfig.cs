


using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SP23.P03.Web.Features.ScheduledTrains;
using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;



public class ScheduledTrainConfiguration : IEntityTypeConfiguration<ScheduledTrain>
{
    public void Configure(EntityTypeBuilder<ScheduledTrain> builder)
    {
        builder.HasKey(scheduledTrain => scheduledTrain.Id);


        builder.Property(scheduledTrain => scheduledTrain.Distance).IsRequired();
        builder.Property(scheduledTrain => scheduledTrain.TravelTime).IsRequired();

        builder.HasOne(scheduledTrain => scheduledTrain.OriginStation)
            .WithMany()
            .HasForeignKey(scheduledTrain => scheduledTrain.OriginStationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(scheduledTrain => scheduledTrain.DestinationStation)
            .WithMany()
            .HasForeignKey(scheduledTrain => scheduledTrain.DestinationStationId)
            .OnDelete(DeleteBehavior.Restrict);

    }

}
