using EWT_Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Commands
{
    public class AddEmployeeCommand : IRequest
    {
        public AddEmployeeCommand(Employee employee)
        {
            this.Employee = employee;
        }

        public Employee Employee { get; private set; }
    }
}
