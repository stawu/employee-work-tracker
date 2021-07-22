using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Domain
{
    public struct WorkEvent
    {
        public WorkEvent(DateTime dateTimeInstant)
        {
            DateTimeInstant = dateTimeInstant.ToUniversalTime();
        }

        public DateTime DateTimeInstant { get; private set; }
    }
}
