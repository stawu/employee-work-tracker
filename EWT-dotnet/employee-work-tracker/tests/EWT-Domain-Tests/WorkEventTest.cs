using EWT_Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EWT_Domain_Tests
{
    public class WorkEventTest
    {
        [Fact]
        public void RequireDateTimeInstant()
        {
            var instant = DateTime.UtcNow;
            WorkEvent workEvent = new WorkEvent(instant);

            Assert.Equal(instant, workEvent.DateTimeInstant);
        }

        [Fact]
        public void DateTimeInstantIsUTC()
        {
            var instant = DateTime.Now;
            WorkEvent workEvent = new WorkEvent(instant);

            Assert.Equal(instant.ToUniversalTime(), workEvent.DateTimeInstant);
        }
    }
}
