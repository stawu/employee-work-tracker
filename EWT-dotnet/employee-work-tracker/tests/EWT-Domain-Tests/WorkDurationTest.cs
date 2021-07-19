using EWT_Domain;
using EWT_Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EWT_Domain_Tests
{
    public class WorkDurationTest
    {
        [Fact]
        public void SettingValue()
        {
            WorkDuration workDuration = new WorkDuration();
            workDuration.StartDateTimeInstant = DateTime.Now.AddDays(-1);
            workDuration.EndDateTimeInstant = DateTime.Now;
        }

        [Fact]
        public void DefaultStartAndEndAreNull()
        {
            WorkDuration workDuration = new WorkDuration();
            Assert.False(workDuration.StartDateTimeInstant.HasValue);
            Assert.False(workDuration.EndDateTimeInstant.HasValue);
        }

        [Fact]
        public void ThrowExcepionWhenStartDateTimeIsAfterEndDateTime()
        {
            var start = DateTime.Now;
            var end = start.AddDays(-1);

            Assert.Throws<StartDateTimeAfterEndDateTimeException>(() =>
            {
                WorkDuration workDuration = new WorkDuration
                {
                    StartDateTimeInstant = start,
                    EndDateTimeInstant = end
                };
            });

            Assert.Throws<StartDateTimeAfterEndDateTimeException>(() =>
            {
                WorkDuration workDuration = new WorkDuration();
                workDuration.EndDateTimeInstant = end;
                workDuration.StartDateTimeInstant = start;
            });
        }

        [Fact]
        public void IsCompletedWhenStartDateTimeAndEndDateTimeSet()
        {
            var end = DateTime.Now;
            var start = end.AddDays(-1);

            WorkDuration workDuration = new();
            workDuration.StartDateTimeInstant = start;

            Assert.False(workDuration.Completed);

            workDuration.EndDateTimeInstant = end;

            Assert.True(workDuration.Completed);
        }

        [Fact]
        public void AsTimeSpanIsNullWhenWorkDurationNotCompleted()
        {
            WorkDuration workDuration = new();

            Assert.False(workDuration.AsTimeSpan().HasValue);

            workDuration.StartDateTimeInstant = DateTime.Now;

            Assert.False(workDuration.AsTimeSpan().HasValue);

            workDuration.EndDateTimeInstant = workDuration.StartDateTimeInstant.Value.AddDays(1);

            Assert.True(workDuration.AsTimeSpan().HasValue);
        }
    }
}
