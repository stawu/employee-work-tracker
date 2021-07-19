using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Date = System.DateTime;

namespace EWT_Domain
{
    //todo do odzielnego pliku?
    public delegate bool EventToWorkDurationDecision(WorkEvent eventToJudge, Date date);

    public class WorkTimeAnalyzer
    {

        readonly private WorkEventContainer workEvents = new();
        private readonly EventToWorkDurationDecision decision;

        public WorkTimeAnalyzer(EventToWorkDurationDecision decision)
        {
            this.decision = decision;
        }

        public void AddWorkEvent(WorkEvent workEvent)
        {
            workEvents.Add(workEvent);
        }

        public IEnumerable<WorkDuration> GetWorkDurationsBetween(DateTime fromInclusive, DateTime toInclusive)
        {
            var events = workEvents.GetEventsBetween(fromInclusive, toInclusive);

            //todo refactor
            var workDurations = new LinkedList<WorkDuration>();
            WorkDuration currentWorkDuration = new WorkDuration();
            foreach(var workEvent in events)
            {
                while (true)
                {
                    var date = (currentWorkDuration.StartDateTimeInstant ?? workEvent.DateTimeInstant).Date;

                    if (decision(workEvent, date) == true)
                    {
                        if (currentWorkDuration.StartDateTimeInstant.HasValue)
                        {
                            currentWorkDuration.EndDateTimeInstant = workEvent.DateTimeInstant;
                            workDurations.AddLast(currentWorkDuration);
                            currentWorkDuration = new WorkDuration();
                            break;
                        }
                        else
                        {
                            currentWorkDuration.StartDateTimeInstant = workEvent.DateTimeInstant;
                            break;
                        }
                    }
                    else if (currentWorkDuration.StartDateTimeInstant.HasValue)
                    {
                        workDurations.AddLast(currentWorkDuration);
                        currentWorkDuration = new WorkDuration();
                    }
                }
            }

            return workDurations;
        }
    }
}
