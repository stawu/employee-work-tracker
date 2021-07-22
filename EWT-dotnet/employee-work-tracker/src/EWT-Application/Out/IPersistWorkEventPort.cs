using EWT_Domain;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Out
{
    public interface IPersistWorkEventPort
    {
        Task<Result> SaveAsync(Guid employeeId, WorkEvent workEvent);
    }
}
