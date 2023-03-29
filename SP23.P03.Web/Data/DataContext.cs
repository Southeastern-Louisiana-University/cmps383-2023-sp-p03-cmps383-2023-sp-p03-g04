using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Carriers;
using SP23.P03.Web.Features.Trains;

namespace SP23.P03.Web.Data;

public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Train> Train { get; set; }
    public DbSet<TrainCar> TrainCar { get; set; }
    public DbSet<TrainCarType> TrainCarType { get; set; }
    public DbSet<Carrier> Carrier { get; set; }

    public DataContext()
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
}
