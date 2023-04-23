using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.ScheduledTrains;
using SP23.P03.Web.Features.Tickets;

namespace SP23.P03.Web.Controllers;

[Route("api/tickets")]
[ApiController]
public class TicketsController : ControllerBase
{
    private readonly DbSet<Ticket> tickets;
    private readonly DataContext dataContext;

    public TicketsController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        tickets = dataContext.Set<Ticket>();
    }
    [HttpGet]
    public IQueryable<TicketDto> GetAllStations(int? myCode)
    {


        var matchingTickets = tickets
            .Where(ticket => ticket.Code == myCode)
            .Select(ticket => new TicketDto
            {

                Id = ticket.Id,
                Code = ticket.Code,
                TicketPrice = ticket.TicketPrice,
                OriginStationName = ticket.OriginStationName,
                DestinationStationName = ticket.DestinationStationName,
                DepartureTime = ticket.DepartureTime,
                ArrivalTime = ticket.ArrivalTime,


            });

        return matchingTickets;
    }
    [HttpPost]

    public ActionResult<TicketDetailsDto> CreateTicket(TicketDetailsDto dto)
    {
        var newTicket = new Ticket
        {
            Code = dto.Code,
            TicketPrice = dto.TicketPrice,
            OriginStationName = dto.OriginStationName,
            DestinationStationName = dto.DestinationStationName,
            DepartureTime = dto.DepartureTime,
            ArrivalTime = dto.ArrivalTime,
        };


        tickets.Add(newTicket);
        dataContext.SaveChanges();


        var createdDto = new TicketDto
        {
            Id = newTicket.Id,
            Code = newTicket.Code,
            TicketPrice = newTicket.TicketPrice,
            OriginStationName = dto.OriginStationName,
            DestinationStationName = dto.DestinationStationName,
            DepartureTime = newTicket.DepartureTime,
            ArrivalTime = newTicket.ArrivalTime,

        };

        return CreatedAtAction(nameof(GetTicketById), new { id = createdDto.Id }, createdDto);
    }
    [HttpGet]
    [Route("{id}")]
    public ActionResult<ScheduledTrainDto> GetTicketById(int id)
    {
        var result = GetTicketDtos(tickets.Where(x => x.Id == id)).FirstOrDefault();
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    private static IQueryable<TicketDto> GetTicketDtos(IQueryable<Ticket> tickets)
    {
        return tickets
            .Select(x => new TicketDto
            {
                Id = x.Id,
                Code = x.Code,
                TicketPrice = x.TicketPrice,
                OriginStationName = x.OriginStationName,
                DestinationStationName = x.DestinationStationName,
                DepartureTime = x.DepartureTime,
                ArrivalTime = x.ArrivalTime,

            });
    }
}
