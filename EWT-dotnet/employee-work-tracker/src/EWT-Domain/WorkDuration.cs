using EWT_Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Domain
{
    public struct WorkDuration
    {
        public DateTime? StartDateTimeInstant 
        { 
            get => _startDateTimeInstant; 
            set {
                if (EndDateTimeInstant < value)
                    throw new StartDateTimeAfterEndDateTimeException();

                _startDateTimeInstant = value;
            } 
        }
        public DateTime? EndDateTimeInstant 
        { 
            get => _endDateTimeInstant; 
            set
            {
                if (StartDateTimeInstant > value)
                    throw new StartDateTimeAfterEndDateTimeException();

                _endDateTimeInstant = value;
            } 
        }

        public bool Completed
        {
            get => StartDateTimeInstant.HasValue && EndDateTimeInstant.HasValue;
        }

        public TimeSpan? AsTimeSpan()
        {
            return Completed ? EndDateTimeInstant.Value - StartDateTimeInstant.Value : null;
        }

        private DateTime? _startDateTimeInstant;
        private DateTime? _endDateTimeInstant;
    }
}
