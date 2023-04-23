using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Schedules;
using SP23.P03.Web.Features.ScheduledTrains;
using SP23.P03.Web.Features.TrainStations;
using SP23.P03.Web.Features.Trains;
using System.Diagnostics;

namespace SP23.P03.Web.Controllers;

[Route("api/scheduledtrains")]
[ApiController]
public class ScheduledTrainsController : ControllerBase
{
    private readonly DbSet<ScheduledTrain> scheduledtrains;
    private readonly DataContext dataContext;

    public ScheduledTrainsController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        scheduledtrains = dataContext.Set<ScheduledTrain>();
    }

    [HttpGet]
    public IQueryable<ScheduledTrainDto> GetAllStations()
    {
        return GetScheduledTrainDtos(scheduledtrains);
    }

    [HttpGet("scheduled-trains_station")]
    public ActionResult<List<ScheduledTrainSearchDto>> GetAllScheduledTrainsFromStation(string? originStationName)
    {
        var scheduledTrains = dataContext.Set<ScheduledTrain>()
            .Where(st => st.OriginStation!.Name == originStationName)
            .Select(st => new ScheduledTrainSearchDto
            {
                Id = st.Id,
                OriginStationId = st.OriginStation!.Id,
                OriginStation = new TrainStationDto
                {
                    Id = st.OriginStation.Id,
                    Name = st.OriginStation.Name,
                    Street = st.OriginStation.Street,
                    City = st.OriginStation.City,
                    State = st.OriginStation.State,
                    Country = st.OriginStation.Country,
                    ZipCode = st.OriginStation.ZipCode
                },
                DestinationStationId = st.DestinationStation!.Id,
                DestinationStation = new TrainStationDto
                {
                    Id = st.DestinationStation.Id,
                    Name = st.DestinationStation.Name,
                    Street = st.DestinationStation.Street,
                    City = st.DestinationStation.City,
                    State = st.DestinationStation.State,
                    Country = st.DestinationStation.Country,
                    ZipCode = st.DestinationStation.ZipCode
                },
                Distance = st.Distance,
                TravelTime = st.TravelTime,
                Schedules = st.Schedules
                   .Select(s => new ScheduleSearchDto
                   {
                       Id = s.Id,
                       ScheduledTrainId = s.ScheduledTrainId,
                       TrainsId = s.Train!.Id,
                       DepartureTime = s.DepartureTime,
                       ArrivalTime = s.ArrivalTime,
                       Train = new TrainDto
                       {
                           CarrierId = s.TrainsId,
                       //    Name = s.Train.Name,
                       //    TrainClass = s.Train.TrainClass,
                       //    AvailableSeats = s.Train.AvailableSeats,
                       //    DinerCarts = s.Train.DinerCarts,
                       //    CoachSeats = s.Train.CoachSeats,
                       //    FirstClassSeats = s.Train.FirstClassSeats,
                       //    SleeperSeats = s.Train.SleeperSeats,
                       //    RoomletSeats = s.Train.RoomletSeats,
                       }
                   }).ToList()
            }).ToList();

        return scheduledTrains;
    }

    [HttpGet("scheduled-trains")]
    public ActionResult<List<ScheduledTrainSearchDto>> GetScheduledTrains(string? originStation, string? destinationStation, DateTime? departureDate)
    {
        if (originStation == null)
        {
            return BadRequest("Origin Station is missing");
        }

        if (destinationStation == null)
        {
            return BadRequest("Destination Station is missing");
        }

        if (departureDate == null)
        {
            return BadRequest("Departure Date is missing");
        }

        var scheduledTrains = dataContext.Set<ScheduledTrain>()
            .Where(st => st.OriginStation!.Name == originStation && st.DestinationStation!.Name == destinationStation)
            .Select(st => new ScheduledTrainSearchDto
            {
                Id = st.Id,
                OriginStationId = st.OriginStation!.Id,
                OriginStation = new TrainStationDto
                {
                    Id = st.OriginStation.Id,
                    Name = st.OriginStation.Name,
                    Street = st.OriginStation.Street,
                    City = st.OriginStation.City,
                    State = st.OriginStation.State,
                    Country = st.OriginStation.Country,
                    ZipCode = st.OriginStation.ZipCode
                },
                DestinationStationId = st.DestinationStation!.Id,
                DestinationStation = new TrainStationDto
                {
                    Id = st.DestinationStation.Id,
                    Name = st.DestinationStation.Name,
                    Street = st.DestinationStation.Street,
                    City = st.DestinationStation.City,
                    State = st.DestinationStation.State,
                    Country = st.DestinationStation.Country,
                    ZipCode = st.DestinationStation.ZipCode
                },
                Distance = st.Distance,
                TravelTime = st.TravelTime,
                Schedules = st.Schedules.Where(s => s.DepartureTime.Date == departureDate.Value.Date) // This should be changed
                   .Select(s => new ScheduleSearchDto
                   {
                       Id = s.Id,
                       ScheduledTrainId = s.ScheduledTrainId,
                       TrainsId = s.Train!.Id,
                       DepartureTime = s.DepartureTime,
                       ArrivalTime = s.ArrivalTime,
                       Train = new TrainDto
                       {
                           CarrierId = s.TrainsId,
                     //      Name = s.Train.Name,
                      //     TrainClass = s.Train.TrainClass,
                      //     AvailableSeats = s.Train.AvailableSeats,
                       //    DinerCarts = s.Train.DinerCarts,
                        //   CoachSeats = s.Train.CoachSeats,
                         //  FirstClassSeats = s.Train.FirstClassSeats,
                          // SleeperSeats = s.Train.SleeperSeats,
                           //RoomletSeats = s.Train.RoomletSeats,
                       }
                   }).ToList()
            }).ToList();

        return scheduledTrains;
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<ScheduledTrainDto> GetScheduledTrainById(int id)
    {
        var result = GetScheduledTrainDtos(scheduledtrains.Where(x => x.Id == id)).FirstOrDefault();
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPost]
    public ActionResult<ScheduledTrainCreateDto> CreateScheduledTrain(ScheduledTrainCreateDto dto)
    {
        if (dto.OriginStationId == dto.DestinationStationId)
        {
            return BadRequest("Origin and destination station can't be the same.");
        }

        // Check if distance and travel time are positive values
        if (dto.Distance <= 0 || dto.TravelTime <= TimeSpan.Zero)
        {
            return BadRequest("Distance and travel time must be positive values.");
        }
        var scheduledTrain = new ScheduledTrain
        {
            OriginStationId = dto.OriginStationId,
            DestinationStationId = dto.DestinationStationId,
            Distance = dto.Distance,
            TravelTime = dto.TravelTime,
            Schedules = new List<Schedule>()
        };

        scheduledtrains.Add(scheduledTrain);
        dataContext.SaveChanges();

        dataContext.SaveChanges();

        var scheduledTrainDto = new ScheduledTrainCreateDto
        {
            Id = scheduledTrain.Id,
            OriginStationId = scheduledTrain.OriginStationId,
            DestinationStationId = scheduledTrain.DestinationStationId,
            Distance = scheduledTrain.Distance,
            TravelTime = scheduledTrain.TravelTime,

        };

        return CreatedAtAction(nameof(GetScheduledTrainById), new { id = scheduledTrainDto.Id }, scheduledTrainDto);
    }
    [HttpPut]
    [Route("{id}")]
    [Authorize]
    public ActionResult<ScheduledTrainDto> UpdateScheduledTrain(int id, ScheduledTrainCreateDto dto)
    {
        if (dto.OriginStationId == dto.DestinationStationId)
        {
            return BadRequest("Start and end station cannot be the same.");
        }

        // Check if distance and travel time are positive values
        if (dto.Distance <= 0 || dto.TravelTime <= TimeSpan.Zero)
        {
            return BadRequest("Distance and travel time must be positive values.");
        }

        var scheduledTrain = scheduledtrains.FirstOrDefault(x => x.Id == id);
        if (scheduledTrain == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin))
        {
            return Forbid();
        }

        scheduledTrain.OriginStationId = dto.OriginStationId;
        scheduledTrain.DestinationStationId = dto.DestinationStationId;
        scheduledTrain.Distance = dto.Distance;
        scheduledTrain.TravelTime = dto.TravelTime;



        dataContext.SaveChanges();

        var scheduledTrainDto = new ScheduledTrainDto
        {
            Id = scheduledTrain.Id,
            OriginStationId = scheduledTrain.OriginStationId,
            DestinationStationId = scheduledTrain.DestinationStationId,
            Distance = scheduledTrain.Distance,
            TravelTime = scheduledTrain.TravelTime,
            Schedules = scheduledTrain.Schedules.Select(s => new ScheduleDto
            {
                ScheduledTrainId = s.ScheduledTrainId,
                TrainsId = s.TrainsId,
                ArrivalTime = s.ArrivalTime,
                DepartureTime = s.DepartureTime
            }).ToList()
        };

        return Ok(scheduledTrainDto);
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize]
    public ActionResult DeleteStation(int id)
    {
        var scheduledtrain = scheduledtrains.FirstOrDefault(x => x.Id == id);

        if (scheduledtrain == null)
        {
            return NotFound();
        }

        if (!User.IsInRole(RoleNames.Admin) && !User.IsInRole(RoleNames.Admin))
        {
            return Forbid();
        }

        scheduledtrains.Remove(scheduledtrain);

        dataContext.SaveChanges();

        return Ok();
    }

    private bool InvalidManagerId(int? managerId)
    {
        if (managerId == null)
        {
            return false;
        }

        if (!User.IsInRole(RoleNames.Admin))
        {
            // only admins can change manager ids anyway
            return false;
        }
        return !dataContext.Set<User>().Any(x => x.Id == managerId);
    }

    private static IQueryable<ScheduledTrainDto> GetScheduledTrainDtos(IQueryable<ScheduledTrain> scheduledtrains)
    {
        return scheduledtrains
            .Select(x => new ScheduledTrainDto
            {
                Id = x.Id,
                OriginStationId = x.OriginStationId,
                DestinationStationId = x.DestinationStationId,
                Distance = x.Distance,
                TravelTime = x.TravelTime,
                Schedules = x.Schedules.Select(s => new ScheduleDto
                {
                    Id = s.Id,
                    ScheduledTrainId = s.ScheduledTrainId,
                    TrainsId = s.TrainsId,
                    ArrivalTime = s.ArrivalTime,
                    DepartureTime = s.DepartureTime
                }).ToList()
            });
    }
    private static IQueryable<ScheduledTrainCreateDto> GetScheduledTrainCreateDtos(IQueryable<ScheduledTrain> scheduledtrains)
    {
        return scheduledtrains
            .Select(x => new ScheduledTrainCreateDto
            {
                Id = x.Id,
                OriginStationId = x.OriginStationId,
                DestinationStationId = x.DestinationStationId,
                Distance = x.Distance,
                TravelTime = x.TravelTime,

            });
    }
}