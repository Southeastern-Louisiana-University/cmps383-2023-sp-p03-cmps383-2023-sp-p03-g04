using SP23.P03.Web.Features.Schedules;
using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Features.ScheduledTrains
{
    public class ScheduledTrainDto
    {
        public int Id { get; set; }
        public int OriginStationId { get; set; }
        public TrainStationDto OriginStation { get; set; }
        public int DestinationStationId { get; set; }
        public TrainStationDto DestinationStation { get; set; }
        public double Distance { get; set; }
        public TimeSpan TravelTime { get; set; }
        public ICollection<ScheduleDto>? Schedules { get; set; }
    }
    public class ScheduledTrainCreateDto
    {
        public int Id { get; set; }
        public int OriginStationId { get; set; }
        public int DestinationStationId { get; set; }
        public double Distance { get; set; }
        public TimeSpan TravelTime { get; set; }

    }
    public class ScheduledTrainSearchDto
    {
        public int Id { get; set; }
        public int OriginStationId { get; set; }
        public TrainStationDto OriginStation { get; set; }
        public int DestinationStationId { get; set; }
        public TrainStationDto DestinationStation { get; set; }
        public double Distance { get; set; }
        public TimeSpan TravelTime { get; set; }
        public ICollection<ScheduleSearchDto> Schedules { get; set; }
    }
}
