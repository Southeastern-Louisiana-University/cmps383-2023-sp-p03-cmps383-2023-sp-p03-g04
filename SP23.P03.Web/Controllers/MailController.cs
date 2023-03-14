using Microsoft.AspNetCore.Mvc;
using SP23.P03.Web.EmailSender;

namespace SP23.P03.Web.Controllers
{
    [Route("/api/mail")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly MailSender _mailSender;

        public MailController(MailSender mailSender)
        {
            _mailSender = mailSender;
        }

        [HttpPost("/order-confirmation/{email}")]
        public async Task<ActionResult<string>> SendOrderEmail(string email)
        {
            var result = await _mailSender.SendOrderConfirmation(email, "Test Name");

            return Ok(result);
        }
    }
}
