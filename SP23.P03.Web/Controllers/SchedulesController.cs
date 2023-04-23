
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.Schedules;
using SP23.P03.Web.Features.ScheduledTrains;
using SP23.P03.Web.Features.TrainStations;
using SP23.P03.Web.Features.Trains;


namespace SP23.P03.Web.Controllers;

[Route("api/schedules")]
[ApiController]
public class SchedulesController : ControllerBase
{
    private readonly DbSet<Schedule> schedules;
    private readonly DataContext dataContext;

    public SchedulesController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        schedules = dataContext.Set<Schedule>();
    }

    [HttpGet("{id}")]
    public IActionResult GetScheduleById(int id)
    {
        var schedule = schedules.FirstOrDefault(s => s.Id == id);

        if (schedule == null)
        {
            return NotFound();
        }
        List<string> reservedSeats = new List<string>();
        byte[] bookedSeats = schedule.ReservedSeats;

        for (int i = 0; i < bookedSeats.Length; i++)
        {
            if ((bookedSeats[i] & 0x01) != 0)
            {
                reservedSeats.Add("c" + (i + 1));
            }
            if ((bookedSeats[i] & 0x08) != 0)
            {
                reservedSeats.Add("s" + (i + 1));
            }
            if ((bookedSeats[i] & 0x36) != 0)
            {
                reservedSeats.Add("f" + (i + 1));
            }
            if ((bookedSeats[i] & 0x80) != 0)
            {
                reservedSeats.Add("r" + (i + 1));
            }
        }
        var scheduled = dataContext.Set<Schedule>()
            .Where(s => s.Id == id)
            .Select(s =>
     new ScheduleSeatBookDto
     {
         Id = s.Id,
         ScheduledTrainId = s.ScheduledTrain!.Id,
         ScheduledTrain = new ScheduledTrainDto
         {
             Id = s.ScheduledTrain.Id,
             OriginStationId = s.ScheduledTrain.OriginStationId,
             OriginStation = new TrainStationDto
             {
                 Id = s.ScheduledTrain!.OriginStation!.Id,
                 Name = s.ScheduledTrain.OriginStation.Name,
                 Street = s.ScheduledTrain.OriginStation.Street,
                 City = s.ScheduledTrain.OriginStation.City,
                 State = s.ScheduledTrain.OriginStation.State,
                 Country = s.ScheduledTrain.OriginStation.Country,
                 ZipCode = s.ScheduledTrain.OriginStation.ZipCode
             },
             DestinationStationId = s.ScheduledTrain.DestinationStationId,
             DestinationStation = new TrainStationDto
             {
                 Id = s.ScheduledTrain!.DestinationStation!.Id,
                 Name = s.ScheduledTrain.DestinationStation.Name,
                 Street = s.ScheduledTrain.DestinationStation.Street,
                 City = s.ScheduledTrain.DestinationStation.City,
                 State = s.ScheduledTrain.DestinationStation.State,
                 Country = s.ScheduledTrain.DestinationStation.Country,
                 ZipCode = s.ScheduledTrain.DestinationStation.ZipCode
             },
             Distance = s.ScheduledTrain.Distance,
             TravelTime = s.ScheduledTrain.TravelTime,

         },
         TrainsId = s.Train!.Id,
         Train = new TrainDto
         {
             CarrierId = s.Id,
        //     Name = s.Train.Name,
        //     TrainClass = s.Train.TrainClass,
          //   AvailableSeats = s.Train.AvailableSeats,
          //   DinerCarts = s.Train.DinerCarts,
           //  CoachSeats = s.Train.CoachSeats,
            // FirstClassSeats = s.Train.FirstClassSeats,
            // SleeperSeats = s.Train.SleeperSeats,
            // RoomletSeats = s.Train.RoomletSeats,
         },
         AvailableSeats = s.AvailableSeats,
         ReservedCheck = reservedSeats,
         DepartureTime = s.DepartureTime,
         ArrivalTime = s.ArrivalTime,
     }).ToList();
        return Ok(scheduled);
    }
    [HttpPut]
    public IActionResult UpdateSchedule(int id, string[] seatNumbers)

    {
        var schedule = schedules.FirstOrDefault(s => s.Id == id);

        if (schedule == null)
        {
            return NotFound();
        }

        if (seatNumbers == null)
        {
            return BadRequest("Seat numbers cannot be null.");
        }

        byte[] bookedSeats = (byte[])schedule.ReservedSeats.Clone();

        foreach (var seatNumber in seatNumbers)
        {
            int seatIndex = Convert.ToInt32(seatNumber.Substring(1)) - 1;
            char seatTypeN = seatNumber[0];
            switch (seatTypeN)
            {
                case 'c':
                    bookedSeats[seatIndex] |= 0x01;
                    break;
                case 's':
                    bookedSeats[seatIndex] |= 0x08;
                    break;
                case 'f':
                    bookedSeats[seatIndex] |= 0x36;
                    break;
                case 'r':
                    bookedSeats[seatIndex] |= 0x80;
                    break;

                default:
                    return BadRequest("Invalid seat type");
            }
        }
        schedule.ReservedSeats = bookedSeats;
        dataContext.SaveChanges();
        List<string> reservedSeats = new List<string>();
        for (int i = 0; i < bookedSeats.Length; i++)
        {
            if ((bookedSeats[i] & 0x01) != 0)
            {
                reservedSeats.Add("c" + (i + 1));
            }
            if ((bookedSeats[i] & 0x08) != 0)
            {
                reservedSeats.Add("s" + (i + 1));
            }
            if ((bookedSeats[i] & 0x36) != 0)
            {
                reservedSeats.Add("f" + (i + 1));
            }
            if ((bookedSeats[i] & 0x80) != 0)
            {
                reservedSeats.Add("r" + (i + 1));
            }
        }

        var dto = new ScheduleSeatBookDto
        {
            Id = schedule.Id,

            ReservedCheck = reservedSeats,
        };

        return Ok(dto);
    }

}