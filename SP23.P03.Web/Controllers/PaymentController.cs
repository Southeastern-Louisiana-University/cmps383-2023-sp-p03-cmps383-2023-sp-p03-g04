using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Payments;

namespace SP23.P03.Web.Controllers;

[Route("api/payments")]
[ApiController]
public class PaymentsController : ControllerBase
{
    private readonly DbSet<Payment> payments;
    private readonly DataContext dataContext;

    public PaymentsController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        payments = dataContext.Set<Payment>();
    }

    [HttpGet]
    [Authorize(Roles = RoleNames.Admin)]
    public IQueryable<PaymentDto> GetAllPayments()
    {
        return GetPaymentDtos(payments);
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult<PaymentDto> GetPaymentById(int id)
    {
        var result = GetPaymentDtos(payments.Where(x => x.Id == id)).FirstOrDefault();
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPost]
    public ActionResult<PaymentDto> CreatePayment(PaymentDto dto)
    {
        if (IsInvalid(dto))
        {
            return BadRequest();
        }

        var payment = new Payment
        {
            CardProvider = dto.CardProvider
        };

        payments.Add(payment);

        dataContext.SaveChanges();

        dto.Id = payment.Id;

        return CreatedAtAction(nameof(GetPaymentById), new { id = dto.Id }, dto);
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize]
    public ActionResult<PaymentDto> UpdatePayment(int id, PaymentDto dto)
    {
        if (IsInvalid(dto))
        {
            return BadRequest();
        }

        var payment = payments.FirstOrDefault(x => x.Id == id);
        if (payment == null)
        {
            return NotFound();
        }

        payment.CardProvider = dto.CardProvider;


        dataContext.SaveChanges();

        dto.Id = payment.Id;

        return Ok(dto);
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize]
    public ActionResult DeleteStation(int id)
    {
        var station = payments.FirstOrDefault(x => x.Id == id);
        if (station == null)
        {
            return NotFound();
        }

        payments.Remove(station);

        dataContext.SaveChanges();

        return Ok();
    }

    private bool IsInvalid(PaymentDto dto)
    {
        return string.IsNullOrWhiteSpace(dto.CardProvider) ||
               (dto.CardProvider.Length > 120);

    }

    private bool InvalidManagerId(int? managerId)
    {
        if (managerId == null)
        {
            return false;
        }

        if (!User.IsInRole(RoleNames.Admin))
        {
            return false;
        }
        return !dataContext.Set<User>().Any(x => x.Id == managerId);
    }

    private static IQueryable<PaymentDto> GetPaymentDtos(IQueryable<Payment> payments)
    {
        return payments
            .Select(x => new PaymentDto
            {
                Id = x.Id,
                UserId = x.UserId,
                CardProvider = x.CardProvider,

            });
    }
}