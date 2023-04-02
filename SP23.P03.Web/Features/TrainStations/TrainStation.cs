using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features;
using System.ComponentModel.DataAnnotations.Schema;
using SP23.P03.Web.Features.Address;

namespace SP23.P03.Web.Features.TrainStations;

public class TrainStation
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public int? ManagerId { get; set; }

    [ForeignKey("TrainStationAddressId")]
    public int TrainStationAddressId { get; set; }

    public virtual TrainStationAddress TrainStationAddress { get; set; }

    public virtual User? Manager { get; set; }
}