using SP23.P03.Web.Features.Authorization;

namespace SP23.P03.Web.Features.Payments
{
    public class Payment
    {

        public int Id { get; set; }
        public int? UserId { get; set; }

        public virtual User? User { get; set; }

        public string CardProvider { get; set; } = string.Empty;

    }
}
