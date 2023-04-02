﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SP23.P03.Web.Features.Address;

namespace SP23.P03.Web.Features.TrainStations;

public class TrainStationConfiguration : IEntityTypeConfiguration<TrainStation>
{
    public void Configure(EntityTypeBuilder<TrainStation> builder)
    {
        builder.Property(x => x.Name)
            .HasMaxLength(120)
            .IsRequired();

        builder.HasOne(x => x.Manager)
            .WithMany(x => x.ManageStations)
            .HasForeignKey(x => x.ManagerId);
       
    }
}