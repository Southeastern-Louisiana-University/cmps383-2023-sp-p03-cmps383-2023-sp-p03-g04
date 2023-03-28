using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SP23.P03.Web.Features.Trains
{
    public class TrainCarType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [NotNull]
        public string Type { get; set; } = string.Empty;
    }
}
