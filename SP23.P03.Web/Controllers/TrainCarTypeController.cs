using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.Trains;

namespace SP23.P03.Web.Controllers
{
    [Route("api/TrainCarTypes")]
    [ApiController]
    public class TrainCarTypeController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public TrainCarTypeController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost]
        public async Task<ActionResult<TrainCarType>> Create(TrainCarTypeDto dto)
        {
            TrainCarType newType = new();

            newType.Type = dto.Type;
    
            await _dataContext.TrainCarType.AddAsync(newType);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { Id = newType.Id }, dto);
        }

        [HttpGet]
        public async Task<ActionResult<List<TrainCar>>> GetAll()
        {
            return  Ok(await _dataContext.TrainCarType.ToListAsync());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<TrainCar>> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
                
            var trainCarType = await _dataContext.TrainCarType.FindAsync( new {Id = id});

            if (trainCarType == null)
            {
                return NotFound();
            }
                
            return Ok(trainCarType);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TrainCar>> Update(int id, TrainCarTypeDto dto)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var trainCarType = await _dataContext.TrainCarType.FindAsync(new { Id = id });

            if (trainCarType == null)
            {
                return NotFound();
            }

            trainCarType.Type = dto.Type;
            await _dataContext.SaveChangesAsync();
            return Ok(trainCarType);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var trainCarType = await _dataContext.TrainCarType.FindAsync(new { Id = id });

            if (trainCarType == null)
            {
                return NotFound();
            }

            _dataContext.TrainCarType.Remove(trainCarType);
            await _dataContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
