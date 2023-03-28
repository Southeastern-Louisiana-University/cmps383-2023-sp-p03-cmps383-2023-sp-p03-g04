using SP23.P03.Web.Features.Carriers;
using SP23.P03.Web.Features.Trains;
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
        [ForeignKey("TrainStationId")]
        public int ArrivingStationId { get; set; }

        public virtual ICollection<TrainCar> TrainCars { get; set; }
    }
}
