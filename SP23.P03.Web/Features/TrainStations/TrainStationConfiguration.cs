using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SP23.P03.Web.Features.TrainStations;

public class TrainStationConfiguration : IEntityTypeConfiguration<TrainStation>
{
    public void Configure(EntityTypeBuilder<TrainStation> builder)
    {
        builder.Property(x => x.Name)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(x => x.Street)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(x => x.City)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(x => x.State)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(x => x.Country)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(x => x.ZipCode)
            .HasMaxLength(120)
            .IsRequired();
    }
}