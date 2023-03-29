using SP23.P03.Web.Features.Carriers;
using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SP23.P03.Web.Features
{
    public class Train
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("CarrierId")]
        public int CarrierId { get; set; }
        public Carrier Carrier { get; set; }

        [ForeignKey("TrainStationId")]
        public int DepartingStationId { get; set; }
        public TrainStation DepartingStation { get; set; }

        [ForeignKey("TrainStationId")]
        public int ArrivingStationId { get; set; }
        public TrainStation ArrivingStation { get; set; }

        public DateTimeOffset ArrivalTime { get; set; }
        public DateTimeOffset DepartureTime { get; set; }

        public string Status { get; set; }

        public ICollection<TrainCar> TrainCars { get; set; }
    }
}
