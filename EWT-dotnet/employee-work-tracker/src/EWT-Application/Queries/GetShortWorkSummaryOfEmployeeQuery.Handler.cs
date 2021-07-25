using EWT_Application.Errors;
using EWT_Application.Out;
using EWT_Domain;
using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EWT_Application.Queries
{
    public class GetShortWorkSummaryOfEmployeeQueryHandler : IRequestHandler<GetShortWorkSummaryOfEmployeeQuery, Result<ShortWorkSummary>>
    {
        private readonly IPersistWorkEventPort persistWorkEventPort;

        //todo do odzielnego pliku
        private static readonly EventToWorkDurationDecision workDayEndsAt_3am = 
            (eventToJudge, date) => eventToJudge.DateTimeInstant < date.AddDays(1).AddHours(3);

        public GetShortWorkSummaryOfEmployeeQueryHandler(IPersistWorkEventPort persistWorkEventPort)
        {
            this.persistWorkEventPort = persistWorkEventPort;
        }

        //todo REFACTOR
        public async Task<Result<ShortWorkSummary>> Handle(GetShortWorkSummaryOfEmployeeQuery request, CancellationToken cancellationToken)
        {
            DateTime fromInclusiveUtc = request.FromInclusive.ToUniversalTime();
            DateTime toInclusiveUtc = request.ToInclusive.ToUniversalTime();

            var result = await persistWorkEventPort.GetWorkEventsOfEmployeeBetweenAsync(
                request.EmployeeId, fromInclusiveUtc, toInclusiveUtc);

            if (result.IsFailed)
                return result.ToResult<ShortWorkSummary>();

            var workEvents = result.Value;

            WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer(workDayEndsAt_3am);
            foreach (var workEvent in workEvents)
                workTimeAnalyzer.AddWorkEvent(workEvent);

            var workDurations = workTimeAnalyzer.GetWorkDurations();

            ShortWorkSummary shortWorkSummary = new ShortWorkSummary(fromInclusiveUtc, toInclusiveUtc);

            TimeSpan workDurationSum = TimeSpan.Zero;
            foreach(var workDuration in workDurations)
            {
                shortWorkSummary.SetStatusOfDay(workDuration.StartDateTimeInstant.Value.ToUniversalTime(),
                    workDuration.Completed ?
                        ShortWorkSummary.DayStatus.PRESENCE :
                        ShortWorkSummary.DayStatus.PROBLEM);

                TimeSpan? timeSpan = workDuration.AsTimeSpan();
                if(timeSpan.HasValue)
                    workDurationSum = workDurationSum.Add(timeSpan.Value);
            }
            shortWorkSummary.MinutesOfWork = (uint)workDurationSum.TotalMinutes;

            return Result.Ok(shortWorkSummary);
        }
    }
}
