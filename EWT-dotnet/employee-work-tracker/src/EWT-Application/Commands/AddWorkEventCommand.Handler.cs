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
    class AddWorkEventCommandHandler : IRequestHandler<AddWorkEventCommand, Result>
    {
        private readonly IPersistWorkEventPort persistWorkEventPort;

        public AddWorkEventCommandHandler(IPersistWorkEventPort persistWorkEventPort)
        {
            this.persistWorkEventPort = persistWorkEventPort;
        }

        public async Task<Result> Handle(AddWorkEventCommand request, CancellationToken cancellationToken)
        {
            return await persistWorkEventPort.SaveAsync(request.EmployeeId, request.WorkEvent);
        }
    }
}
