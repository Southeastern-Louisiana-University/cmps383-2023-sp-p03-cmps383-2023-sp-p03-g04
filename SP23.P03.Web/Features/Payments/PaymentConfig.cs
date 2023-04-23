using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SP23.P03.Web.Features.Payments
{

        public class PaymentConfig : IEntityTypeConfiguration<Payment> {
        
            public void Configure(EntityTypeBuilder<Payment> builder)
            {
                builder.Property(x => x.CardProvider)
                    .IsRequired();
            }

        }

    }
