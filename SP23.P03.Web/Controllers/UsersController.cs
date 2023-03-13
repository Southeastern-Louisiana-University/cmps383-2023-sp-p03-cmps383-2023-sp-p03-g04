using System.Data;
using System.Net.Mail;
using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using SP23.P03.Web.EmailSender;
using SP23.P03.Web.Features.Authorization;

namespace SP23.P03.Web.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> userManager;
    private readonly MailSender _mailSender;
    public UsersController(UserManager<User> userManager, MailSender mailSender)
    {
        this.userManager = userManager;
        _mailSender = mailSender;
    }

    [HttpGet("confirm-email")]
    public async Task<ActionResult> ConfirmEmail(string email, string token)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
            return BadRequest();

        var confirm = await userManager.ConfirmEmailAsync(user, token);
        var resultDto = new UserDto

        {
            Id = user.Id,
            EmailAddress = user.Email,
            EmailConfirmed = user.EmailConfirmed,
            Roles = new string [] { "Roles"},
            UserName = user.UserName,
        };
        if (confirm.Succeeded)
            return Ok(resultDto);

        return BadRequest();
    }

    [HttpPost]
    [Authorize(Roles = RoleNames.Admin)]
    public async Task<ActionResult<UserDto>> Create(CreateUserDto dto)
    {
        using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var newUser = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
        };

        var createResult = await userManager.CreateAsync(newUser, dto.Password);
        var user = await userManager.FindByEmailAsync(dto.Email);

        if (user != null)
        {
            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            //var confirmationLink = urlHelperFactory.GetUrlHelper(ControllerContext).Action("confirm-email", "/api/users", new { email = user.Email, token = token });
            //var context = Url.ActionContext;
            //Uri uri = new Uri($"https://{nameof(ConfirmEmail)}");
            
            var confirmationLink = Url.Action("ConfirmEmail", "Users", new { email = user.Email, token = token }, Request.Scheme);
            var result = await _mailSender.SendAccountVerificationCode(user.Email!, dto.UserName, confirmationLink);
        }
        if (!createResult.Succeeded)
        {
            return BadRequest();
        }

        try
        {
            var roleResult = await userManager.AddToRolesAsync(newUser, dto.Roles);
            if (!roleResult.Succeeded)
            {
                return BadRequest();
            }
        }
        catch (InvalidOperationException e) when(e.Message.StartsWith("Role") && e.Message.EndsWith("does not exist."))
        {
            return BadRequest();
        }

        transaction.Complete();

        return Ok(new UserDto
        {
            Id = newUser.Id,
            EmailAddress = newUser.Email,
            EmailConfirmed = newUser.EmailConfirmed,
            Roles = dto.Roles,
            UserName = newUser.UserName,
        });
    }
}
