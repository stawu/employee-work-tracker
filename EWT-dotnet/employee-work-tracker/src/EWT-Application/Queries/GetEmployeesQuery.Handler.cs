using EWT_Application.Out;
using EWT_Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EWT_Application.Queries
{
    public class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, IEnumerable<Employee>>
    {
        private readonly IPersistEmployeePort persistEmployeePort;

        public GetEmployeesQueryHandler(IPersistEmployeePort persistEmployeePort)
        {
            this.persistEmployeePort = persistEmployeePort;
        }


        public Task<IEnumerable<Employee>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
        {
            return persistEmployeePort.GetEmployeesAsync();
        }
    }
}
