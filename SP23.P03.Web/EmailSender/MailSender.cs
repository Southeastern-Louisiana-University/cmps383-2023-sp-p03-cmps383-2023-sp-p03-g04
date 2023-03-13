using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using MimeKit;
using SP23.P03.Web.Features.Authorization;

namespace SP23.P03.Web.EmailSender
{
    public class MailSender
    {
        private readonly IConfiguration _configuration;

        public MailSender(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
        }

        public async Task<string> SendOrderConfirmation(string email, string name)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Entrack", "donot-reply@entrack.live"));
            message.To.Add(new MailboxAddress(name, email));
            message.Subject = "Ticket Order Confirmation";
            message.Body = new TextPart("plain") { Text = "Confirmation" };

            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.mailgun.org", 587);
            await client.AuthenticateAsync("postmaster@entrack.live", "e29e1c7bb1e941fce15700f478c2466b-7764770b-7b76906d");

            var result = await client.SendAsync(message);
            await client.DisconnectAsync(true);

            return result;
        }
        public async Task<string> SendAccountVerificationCode(string email, string name, string link)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Entrack", "donot-reply@entrack.live"));
            message.To.Add(new MailboxAddress(name, email));
            message.Subject = "Email Verification Link";
            var body = new BodyBuilder();
            body.HtmlBody = $"<div> <p>This is your verification link: </p> <a href=\"{link}\"> Verify Email </a></div>";
            message.Body = body.ToMessageBody();
            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.mailgun.org", 587);
            await client.AuthenticateAsync("postmaster@entrack.live", "e29e1c7bb1e941fce15700f478c2466b-7764770b-7b76906d");

            var result = await client.SendAsync(message);
            await client.DisconnectAsync(true);

            return result;
        }
    }
}
