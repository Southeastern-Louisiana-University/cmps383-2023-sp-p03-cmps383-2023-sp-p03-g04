using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();
        await dataContext.Database.MigrateAsync();

        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);

        await AddTrainStation(dataContext);
        await AddTrainCarTypes(dataContext);
    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }
        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddTrainStation(DataContext dataContext)
    {
        var trainStations = dataContext.Set<TrainStation>();

        if (await trainStations.AnyAsync())
        {
            trainStations.RemoveRange(trainStations);
            await dataContext.SaveChangesAsync();
        }

        dataContext.Set<TrainStation>()
            .AddRange(
                new TrainStation
                {
                    Name = "Hammond",
                    TrainStationAddress = new()
                    {
                        City = "Hammond",
                        State = "LA",
                        ZipCode = "70401",
                        Street = "4 Golden Drive"
                    }
                },
                new TrainStation
                {
                    Name = "New Orleans",
                    TrainStationAddress = new()
                    {
                        City = "New Orleans",
                        State = "LA",
                        ZipCode = "70118",
                        Street = "1101 Foucher St"
                    }
                },
                new TrainStation
                {
                    Name = "Baton Rouge",
                    TrainStationAddress = new()
                    {
                        City = "Baton Rouge",
                        State = "LA",
                        ZipCode = "70810",
                        Street = "S Glenstone Pl"
                    }

                }
            );

        await dataContext.SaveChangesAsync();
    }

    private static async Task AddTrainCarTypes(DataContext context)
    {
        var types = context.Set<TrainCarType>();

       if (!await types.AnyAsync(x => x.Type == "Coach"))
        {
            await types.AddAsync(new TrainCarType
            {
                Type = "Coach"
            });
        }
        if (!await types.AnyAsync(x => x.Type == "First Class"))
        {
            await types.AddAsync(new TrainCarType
            {
                Type = "First Class"
            });
        }
        if (!await types.AnyAsync(x => x.Type == "Sleeper"))
        {
            await types.AddAsync(new TrainCarType
            {
                Type = "Sleeper"
            });
        }
        if (!await types.AnyAsync(x => x.Type == "Roomlet"))
        {
            await types.AddAsync(new TrainCarType
            {
                Type = "Roomlet"
            });
        }
        await context.SaveChangesAsync();
    }
}