using System.ComponentModel.DataAnnotations.Schema;

namespace SP23.P03.Web.Features.Trains
{
    public class TrainCar
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("TrainId")]
        public int TrainId { get; set; }
        [ForeignKey("TrainCarTypeId")]
        public int TrainCarTypeId { get; set; }
        public TrainCarType TrainCarType { get; set; }
        public int Capacity { get; set; }
    }
}
