using SP23.P03.Web.Features.Schedules;
using SP23.P03.Web.Features.TrainStations;
namespace SP23.P03.Web.Features.ScheduledTrains
{
    public class ScheduledTrain
    {
        public int Id { get; set; }
        public int OriginStationId { get; set; }
        public virtual TrainStation? OriginStation { get; set; }
        public int DestinationStationId { get; set; }
        public virtual TrainStation? DestinationStation { get; set; }
        public double Distance { get; set; }
        public TimeSpan TravelTime { get; set; }
        public virtual ICollection<Schedule> Schedules { get; set; }
    }
}
