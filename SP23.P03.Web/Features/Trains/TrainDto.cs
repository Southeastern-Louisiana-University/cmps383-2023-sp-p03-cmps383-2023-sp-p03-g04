namespace SP23.P03.Web.Features.Trains
{
    public class TrainDto
    {

        public int CarrierId { get; set; }
        public int DepartingStationId { get; set; }
        public int ArrivingStationId { get; set; }
        public DateTimeOffset ArrivalTime { get; set; }
        public DateTimeOffset DepartureTime { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class TrainUpdateDto
    {
        public DateTimeOffset ArrivalTime { get; set; }
        public DateTimeOffset DepartureTime { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
