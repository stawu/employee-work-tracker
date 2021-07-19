using EWT_Application.Out;
using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EWT_Application.Commands
{
    class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand, Result>
    {
        private readonly IPersistEmployeePort persistEmployeePort;

        public DeleteEmployeeCommandHandler(IPersistEmployeePort persistEmployeePort)
        {
            this.persistEmployeePort = persistEmployeePort;
        }

        public async Task<Result> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
        {
            return await persistEmployeePort.DeleteAsync(request.EmployeeId);
        }
    }
}
