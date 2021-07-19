using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Domain.Exceptions
{

    [Serializable]
    public class StartDateTimeAfterEndDateTimeException : Exception
    {
        public StartDateTimeAfterEndDateTimeException() { }
        public StartDateTimeAfterEndDateTimeException(string message) : base(message) { }
        public StartDateTimeAfterEndDateTimeException(string message, Exception inner) : base(message, inner) { }
        protected StartDateTimeAfterEndDateTimeException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
