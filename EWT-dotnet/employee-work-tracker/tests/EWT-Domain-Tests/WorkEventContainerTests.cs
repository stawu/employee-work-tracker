using EWT_Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EWT_Domain_Tests
{
    public class WorkEventContainerTests
    {
        private static readonly WorkEvent[] workEvents =
        {
            new WorkEvent(DateTime.Now.AddDays(-1)),
            new WorkEvent(DateTime.Now.AddMinutes(-34)),
            new WorkEvent(DateTime.Now.AddMinutes(-67)),
            new WorkEvent(DateTime.Now.AddMinutes(-31)),
            new WorkEvent(DateTime.Now.AddMinutes(-14)),
            new WorkEvent(DateTime.Now.AddMinutes(0))
        };

        private readonly WorkEventContainer container;

        public WorkEventContainerTests()
        {
            this.container = new();
            foreach (var workEvent in workEvents)
                container.Add(workEvent);
        }

        [Fact]
        public void ReturnProperEventsBetweenDates()
        {
            var eventsBetweenArray = container.GetEventsBetween(DateTime.Now.AddMinutes(-70), DateTime.Now.AddMinutes(-15)).ToArray();

            Assert.DoesNotContain(workEvents[0], eventsBetweenArray);
            Assert.Contains(workEvents[1], eventsBetweenArray);
            Assert.Contains(workEvents[2], eventsBetweenArray);
            Assert.Contains(workEvents[3], eventsBetweenArray);
            Assert.DoesNotContain(workEvents[4], eventsBetweenArray);
            Assert.DoesNotContain(workEvents[5], eventsBetweenArray);
        }

        [Fact]
        public void EventsPropertyReturnFlatCollectionOfWorkEvents()
        {
            var eventsArray = container.Events.ToArray();

            foreach (var workEvent in workEvents)
                Assert.Contains(workEvent, eventsArray);
        }
    }
}
