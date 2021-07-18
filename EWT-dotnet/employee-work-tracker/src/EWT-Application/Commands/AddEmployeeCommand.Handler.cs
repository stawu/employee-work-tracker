using EWT_Application.Out;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EWT_Application.Commands
{
    class AddEmployeeCommandHandler : IRequestHandler<AddEmployeeCommand>
    {
        private readonly IPersistEmployeePort persistEmployeePort;

        public AddEmployeeCommandHandler(IPersistEmployeePort persistEmployeePort)
        {
            this.persistEmployeePort = persistEmployeePort;
        }

        public async Task<Unit> Handle(AddEmployeeCommand request, CancellationToken cancellationToken)
        {
            await persistEmployeePort.SaveAsync(request.Employee);
            return Unit.Value;
        }
    }
}
