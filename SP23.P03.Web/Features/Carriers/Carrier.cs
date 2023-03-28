using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SP23.P03.Web.Features.Carriers
{
    public class Carrier
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [NotNull]
        [MinLength(1)]
        public string Name { get; set; } = string.Empty;

        public virtual ICollection<Train> Trains { get; set; }
    }
}
