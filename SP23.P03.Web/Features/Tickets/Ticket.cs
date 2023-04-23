namespace SP23.P03.Web.Features.Tickets
{
    public class Ticket
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public double TicketPrice { get; set; }
        public string OriginStationName { get; set; } = string.Empty;
        public string DestinationStationName { get; set; } = string.Empty;
        public DateTimeOffset DepartureTime { get; set; }    
        public DateTimeOffset ArrivalTime { get; set; }

    }
}
