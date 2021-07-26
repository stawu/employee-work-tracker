using EWT_Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application
{
    public class DetailedWorkSummary
    {
        public uint MinutesOfWork { get; set; }
        public IEnumerable<WorkDuration> WorkDurations { get; private set; }
        public DateTime StartDateTime { get; private set; }
        public DateTime EndDateTime { get; private set; }

        public DetailedWorkSummary(DateTime startDateTime, DateTime endDateTime, IEnumerable<WorkDuration> workDurations)
        {
            if (startDateTime > endDateTime)
                throw new ArgumentException();

            StartDateTime = startDateTime;
            EndDateTime = endDateTime;
            WorkDurations = workDurations;
        }
    }
}
