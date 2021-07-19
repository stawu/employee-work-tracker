using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Commands
{
    public class DeleteEmployeeCommand : IRequest<Result>
    {
        public DeleteEmployeeCommand(Guid employeeId)
        {
            EmployeeId = employeeId;
        }

        public Guid EmployeeId { get; }
    }
}
