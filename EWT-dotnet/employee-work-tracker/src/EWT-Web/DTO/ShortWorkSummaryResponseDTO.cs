using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using Date = System.DateTime;

namespace EWT_Web.DTO
{
    public struct DayInformations
    {
        public Date Date { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public EWT_Application.Queries.ShortWorkSummary.DayStatus DayStatus { get; set;  }
    }

    public struct ShortWorkSummaryResponseDTO
    {
        public uint MinutesOfWork { get; set; }
        public IEnumerable<DayInformations> DaysStatuses { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}
