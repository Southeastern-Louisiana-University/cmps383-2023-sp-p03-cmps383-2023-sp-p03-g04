using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.Carriers;

namespace SP23.P03.Web.Controllers
{
    [ApiController]
    [Route("api/Carriers")]
    public class CarriersController : Controller
    {
        private readonly DataContext _dataContext;

        public CarriersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("{carrier}")]
        public async Task<ActionResult<Carrier>> CreateCarrier(Carrier carrier)
        {
            var newCarrier = carrier;
            await _dataContext.AddAsync(newCarrier);

            return CreatedAtAction(nameof(GetById), 
                new { id = newCarrier.Id }, carrier);
        }

        [HttpGet]
        public async Task<ActionResult<List<Carrier>>> GetAllCarriers()
        {
            return await _dataContext.Carrier
                .Include(x => x.Trains)
                .ToListAsync();
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Carrier>> GetById(int id)
        {
            var carrier = await _dataContext.Carrier
                .Include(x => x.Trains)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (carrier == null)
                return NotFound();
            return Ok(carrier);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Carrier>> UpdateCarrier(int id, Carrier updateCarrier)
        {
            var carrier = await _dataContext.Carrier.FindAsync(id);

            if (carrier == null)
                return NotFound();

            carrier.Name = updateCarrier.Name;

            await _dataContext.SaveChangesAsync();

            return Ok(carrier);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteCarrier(int id)
        {
            var carrier = await _dataContext.Carrier.FindAsync(id);

            if (carrier == null)
                return NotFound();
            _dataContext.Carrier.Remove(carrier);
            await _dataContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
