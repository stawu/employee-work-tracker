using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Queries
{
    public class GetShortWorkSummaryOfEmployeeQuery : IRequest<Result<ShortWorkSummary>>
    {
        public GetShortWorkSummaryOfEmployeeQuery(Guid employeeId, DateTime fromInclusive, DateTime toInclusive)
        {
            EmployeeId = employeeId;
            FromInclusive = fromInclusive;
            ToInclusive = toInclusive;
        }

        public Guid EmployeeId { get; }
        public DateTime FromInclusive { get; }
        public DateTime ToInclusive { get; }
    }
}
