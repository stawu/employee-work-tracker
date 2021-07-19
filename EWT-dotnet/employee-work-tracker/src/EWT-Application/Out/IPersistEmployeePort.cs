using EWT_Domain;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Out
{
    public interface IPersistEmployeePort
    {
        Task SaveAsync(Employee employee);
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<Result> DeleteAsync(Guid employeeId);
    }
}
