using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features;
using SP23.P03.Web.Features.Trains;

namespace SP23.P03.Web.Controllers
{
    [ApiController]
    [Route("api/Trains")]
    public class TrainController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public TrainController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost]
        public async Task<ActionResult<Train>> Create(TrainDto dto)
        {

            Train train = new();

            train.CarrierId = dto.CarrierId;
            train.ArrivingStationId = dto.ArrivingStationId;
            train.DepartingStationId = dto.DepartingStationId;
            train.ArrivalTime = dto.ArrivalTime;
            train.DepartureTime = dto.DepartureTime;

            await _dataContext.Train.AddAsync(train);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { train.Id }, dto);
        }

        [HttpGet]
        public async Task<ActionResult<List<Train>>> GetAll()
        {
            return Ok(await _dataContext.Train
                 .Include(x => x.Carrier)
                 .Include(x => x.TrainCars)
                 .Include(x => x.DepartingStation)
                 .Include(x => x.ArrivingStation)
                 .ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var train = await _dataContext.Train.FirstOrDefaultAsync(x => x.Id == id);

            return train == null ? NotFound() : Ok(train);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Train>> Update(int id, TrainUpdateDto dto)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var train = await _dataContext.Train.FirstOrDefaultAsync(x => x.Id == id);

            if (train == null)
            {
                return NotFound();
            }

            train.Status = dto.Status;
            train.ArrivalTime = dto.ArrivalTime;
            train.DepartureTime = dto.DepartureTime;

            await _dataContext.SaveChangesAsync();
            return Ok(train);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var train = await _dataContext.Train.FirstOrDefaultAsync(x => x.Id == id);

            if (train == null)
            {
                return NotFound();
            }

            _dataContext.Remove(train);

            await _dataContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
