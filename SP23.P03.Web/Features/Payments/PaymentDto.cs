using SP23.P03.Web.Features.Authorization;

namespace SP23.P03.Web.Features.Payments
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public virtual UserDto? User { get; set; }
        public string CardProvider { get; set; } = string.Empty;

    }
}
