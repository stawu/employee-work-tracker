using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Date = System.DateTime;

namespace EWT_Domain
{
    public class WorkEventContainer
    {
        readonly private SortedDictionary<Date, SortedSet<WorkEvent>> events = new SortedDictionary<Date, SortedSet<WorkEvent>>();
        private static readonly Comparison<WorkEvent> workEventComparison = (e1, e2) =>
        {
            if (e1.DateTimeInstant == e2.DateTimeInstant)
                return 0;

            return e1.DateTimeInstant < e2.DateTimeInstant ? -1 : 1;
        };

        public void Add(WorkEvent workEvent)
        {
            var workEventDate = workEvent.DateTimeInstant.Date;

            if (!events.ContainsKey(workEventDate))
                events.Add(workEventDate,
                    new SortedSet<WorkEvent>(Comparer<WorkEvent>.Create(workEventComparison)));

            events.TryGetValue(workEventDate, out var eventsSet);
            eventsSet.Add(workEvent);
        }

        public IEnumerable<WorkEvent> GetEventsBetween(DateTime fromInclusive, DateTime toInclusive)
        {
            fromInclusive = fromInclusive.ToUniversalTime();
            toInclusive = toInclusive.ToUniversalTime();

            return events.SkipWhile(e => e.Key < fromInclusive.Date)
                        .TakeWhile(e => e.Key <= toInclusive.Date)
                        .SelectMany(e => e.Value)
                        .Where(workEvent => workEvent.DateTimeInstant >= fromInclusive
                            && workEvent.DateTimeInstant <= toInclusive);
        }
    }
}
