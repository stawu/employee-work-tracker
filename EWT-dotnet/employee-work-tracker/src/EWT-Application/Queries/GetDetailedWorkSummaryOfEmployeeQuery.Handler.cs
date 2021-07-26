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
    public class GetDetailedWorkSummaryOfEmployeeQueryHandler : IRequestHandler<GetDetailedWorkSummaryOfEmployeeQuery, Result<DetailedWorkSummary>>
    {
        private readonly IPersistWorkEventPort persistWorkEventPort;

        //todo do odzielnego pliku
        private static readonly EventToWorkDurationDecision workDayEndsAt_3am =
            (eventToJudge, date) => eventToJudge.DateTimeInstant < date.AddDays(1).AddHours(3);

        public GetDetailedWorkSummaryOfEmployeeQueryHandler(IPersistWorkEventPort persistWorkEventPort)
        {
            this.persistWorkEventPort = persistWorkEventPort;
        }

        public async Task<Result<DetailedWorkSummary>> Handle(GetDetailedWorkSummaryOfEmployeeQuery request, CancellationToken cancellationToken)
        {
            DateTime fromInclusiveUtc = request.FromInclusive.ToUniversalTime();
            DateTime toInclusiveUtc = request.ToInclusive.ToUniversalTime();

            var result = await persistWorkEventPort.GetWorkEventsOfEmployeeBetweenAsync(
                request.EmployeeId, fromInclusiveUtc, toInclusiveUtc);

            if (result.IsFailed)
                return result.ToResult<DetailedWorkSummary>();

            var workEvents = result.Value;

            WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer(workDayEndsAt_3am);
            foreach (var workEvent in workEvents)
                workTimeAnalyzer.AddWorkEvent(workEvent);

            var workDurations = workTimeAnalyzer.GetWorkDurations();

            DetailedWorkSummary detailedWorkSummary = new DetailedWorkSummary(
                fromInclusiveUtc, toInclusiveUtc, workDurations);

            TimeSpan workDurationSum = TimeSpan.Zero;
            foreach (var workDuration in workDurations)
            {
                TimeSpan? timeSpan = workDuration.AsTimeSpan();
                if (timeSpan.HasValue)
                    workDurationSum = workDurationSum.Add(timeSpan.Value);
            }
            detailedWorkSummary.MinutesOfWork = (uint)workDurationSum.TotalMinutes;

            return Result.Ok(detailedWorkSummary);
        }
    }
}
