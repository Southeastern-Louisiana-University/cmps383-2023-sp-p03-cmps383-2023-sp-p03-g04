using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.EmailSender;
using SP23.P03.Web.Features.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// sets up our database connection
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DataContext")));

builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});

//builder.Services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme).AddCertificate(b => b.AllowedCertificateTypes = CertificateTypes.All);

builder.Services.AddControllers();
var services = builder.Services;

services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

services.AddMvc();
builder.Services.AddScoped<MailSender>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    await SeedHelper.MigrateAndSeed(scope.ServiceProvider);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseRouting();
app.UseAuthorization();
#pragma warning disable ASP0014 // Suggest using top level route registrations
app.UseEndpoints(routeBuilder =>
{
    routeBuilder.MapControllers();
});
#pragma warning restore ASP0014 // Suggest using top level route registrations

app.UseStaticFiles();
app.UseSpa(spaBuilder =>
{
    spaBuilder.Options.SourcePath = "ClientApp";
    
    if (app.Environment.IsDevelopment())
    {
        
        spaBuilder.UseProxyToSpaDevelopmentServer("https://localhost:3000/");
    }
});
app.UseCors("AllowOrigin");
app.Run();

//see: https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-7.0
// Hi 383 - this is added so we can test our web project automatically. More on that later
namespace SP23.P03.Web
{
    public partial class Program { }
}