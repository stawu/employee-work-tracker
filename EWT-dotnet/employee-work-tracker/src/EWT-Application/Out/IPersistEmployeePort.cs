using EWT_Domain;
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
    }
}
