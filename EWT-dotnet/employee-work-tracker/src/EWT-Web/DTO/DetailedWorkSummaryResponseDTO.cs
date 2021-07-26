using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWT_Web.DTO
{
    public struct WorkDurationDTO
    {
        public DateTime? StartDateTimeInstant { get; set; }
        public DateTime? EndDateTimeInstant { get; set; }
    }

    public struct DetailedWorkSummaryResponseDTO
    {
        public uint MinutesOfWork { get; set; }
        public IEnumerable<WorkDurationDTO> WorkDurations { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}
