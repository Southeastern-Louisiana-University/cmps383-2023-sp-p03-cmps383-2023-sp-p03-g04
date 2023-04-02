namespace SP23.P03.Web.Features.Trains
{
    public class TrainCarDto
    {
        public int TrainCarTypeId { get; set; }
        public int TrainId { get; set; }
        public int Capacity { get; set; }
    }

    public class TrainCarUpdateDto
    {
        public int Capacity { get; set; }
        public int TicketsSold { get; set; }
    }
}
