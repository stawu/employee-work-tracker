using EWT_Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Queries
{
    public class GetEmployeesQuery : IRequest<IEnumerable<Employee>>
    {
    }
}
