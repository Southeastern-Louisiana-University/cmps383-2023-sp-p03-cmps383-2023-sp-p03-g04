using SP23.P03.Web.Features.Authorization;

namespace SP23.P03.Web.Features.TrainStations;

public class TrainStationDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public int? ManagerId { get; set; }
    public virtual UserDto? Manager { get; set; }
}