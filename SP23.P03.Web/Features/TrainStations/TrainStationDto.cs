
using SP23.P03.Web.Features.Address;

namespace SP23.P03.Web.Features.TrainStations;

public class TrainStationDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public TrainStationAddress StationAddress { get; set; }

    public int? ManagerId { get; set; }
}