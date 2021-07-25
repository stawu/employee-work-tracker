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
        private static readonly WorkEvent[] workEvents =
        {
            new WorkEvent(new DateTime(2021, 7, 10, 10, 0, 0)),
            new WorkEvent(new DateTime(2021, 7, 10, 16, 0, 0)),

            new WorkEvent(new DateTime(2021, 7, 11, 10, 0, 0)),

            new WorkEvent(new DateTime(2021, 7, 12, 9, 0, 0)),
            new WorkEvent(new DateTime(2021, 7, 12, 17, 0, 0)),

            new WorkEvent(new DateTime(2021, 7, 14, 9, 0, 0)),
            new WorkEvent(new DateTime(2021, 7, 14, 17, 0, 0)),
        };

        private readonly WorkTimeAnalyzer workTimeAnalyzer;

        public WorkTimeAnalyzerTest()
        {
            workTimeAnalyzer = new WorkTimeAnalyzer((eventToJudge, date) =>
            {
                return eventToJudge.DateTimeInstant < date.AddDays(1).AddHours(4);
            });

            foreach (var workEvent in workEvents)
                workTimeAnalyzer.AddWorkEvent(workEvent);
        }

        [Fact]
        public void WorkDurationsBetweenReturnProperWorkDurations()
        {
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

            Assert.Equal(3, workDurationsArray.Length);
        }

        [Fact]
        public void WorkDurationsReturnProperWorkDurations()
        {
            var workDurationsArray = workTimeAnalyzer.GetWorkDurations().ToArray();

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

            Assert.Equal(new WorkDuration
            {
                StartDateTimeInstant = workEvents[5].DateTimeInstant,
                EndDateTimeInstant = workEvents[6].DateTimeInstant
            }, workDurationsArray[3]);

            Assert.Equal(4, workDurationsArray.Length);
        }
    }
}
