using SP23.P03.Web.Features.TrainStations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SP23.P03.Web.Features.Address
{
    public class TrainStationAddress
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

        [ForeignKey("TrainStationId")]
        public int TrainStationId { get; set; }
        public virtual TrainStation TrainStation { get; set; }
    }
}
