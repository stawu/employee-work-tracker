using EWT_Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EWT_Domain_Tests
{
    public class WorkTimeAnalyzerTest
    {
        [Fact]
        public void WorkDurationsBetweenReturnProperWorkDurations()
        {
            WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer((eventToJudge, date) =>
            {
                return eventToJudge.DateTimeInstant < date.AddDays(1).AddHours(4);
            });

            WorkEvent[] workEvents =
            {
                new WorkEvent(new DateTime(2021, 7, 10, 10, 0, 0)),
                new WorkEvent(new DateTime(2021, 7, 10, 16, 0, 0)),

                new WorkEvent(new DateTime(2021, 7, 11, 10, 0, 0)),

                new WorkEvent(new DateTime(2021, 7, 12, 9, 0, 0)),
                new WorkEvent(new DateTime(2021, 7, 12, 17, 0, 0))
            };

            foreach (var workEvent in workEvents)
                workTimeAnalyzer.AddWorkEvent(workEvent);

            var workDurationsArray = workTimeAnalyzer.GetWorkDurationsBetween(new DateTime(2021, 7, 10, 10, 0, 0),
                new DateTime(2021, 7, 12, 17, 0, 0)).ToArray();

            Assert.Equal(new WorkDuration
            {
                StartDateTimeInstant = workEvents[0].DateTimeInstant,
                EndDateTimeInstant = workEvents[1].DateTimeInstant
            }, workDurationsArray[0]);

            Assert.Equal(new WorkDuration
            {
                StartDateTimeInstant = workEvents[2].DateTimeInstant,
            }, workDurationsArray[1]);

            Assert.Equal(new WorkDuration
            {
                StartDateTimeInstant = workEvents[3].DateTimeInstant,
                EndDateTimeInstant = workEvents[4].DateTimeInstant
            }, workDurationsArray[2]);
        }
    }
}
