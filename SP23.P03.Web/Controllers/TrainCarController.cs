using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features;
using SP23.P03.Web.Features.Trains;

namespace SP23.P03.Web.Controllers
{
    [ApiController]
    [Route("api/TrainCars")]
    public class TrainCarController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public TrainCarController(DataContext dataCotext)
        {
            _dataContext = dataCotext;
        }

        [HttpPost]
        public async Task<ActionResult<TrainCar>> Create(TrainCarDto dto) {
            TrainCar newTrainCar = new();

            newTrainCar.Capacity = dto.Capacity;
            newTrainCar.TrainCarTypeId = dto.TrainCarTypeId;
            newTrainCar.TrainId = dto.TrainId;

            await _dataContext.TrainCar.AddAsync(newTrainCar);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { newTrainCar.Id }, dto);
        }
        [HttpGet]
        public async Task<ActionResult<List<TrainCar>>> GetAll()
        {
            return await _dataContext.TrainCar
               .Include(x => x.Train)
               .ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TrainCar>> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var trainCar = await _dataContext.TrainCar.FirstOrDefaultAsync(x => x.Id == id);

            return trainCar == null ? NotFound() : Ok(trainCar);
        }
        [HttpPut]
        public async Task<ActionResult<Train>> Update(int id, TrainCarUpdateDto dto)
        {
       
            if (id <= 0)
            {
                return BadRequest();
            }
            var trainCar = await _dataContext.TrainCar.FirstOrDefaultAsync(x => x.Id == id);

            if (trainCar == null)
            {
                return NotFound();
            }

            trainCar.Capacity = dto.Capacity;
            trainCar.TicketsSold = dto.TicketsSold;
            trainCar.TrainId = id;
            await _dataContext.SaveChangesAsync();

            return Ok(trainCar);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var trainCar = await _dataContext.TrainCar.FirstOrDefaultAsync(x => x.Id == id);

            if (trainCar == null)
            {
                return NotFound();
            }

            _dataContext.TrainCar.Remove(trainCar);
            await _dataContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
