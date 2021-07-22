using EWT_Domain;
using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Commands
{
    public class AddWorkEventCommand : IRequest<Result>
    {
        public AddWorkEventCommand(Guid employeeId, WorkEvent workEvent)
        {
            EmployeeId = employeeId;
            WorkEvent = workEvent;
        }

        public Guid EmployeeId { get; }
        public WorkEvent WorkEvent { get; }
    }
}
