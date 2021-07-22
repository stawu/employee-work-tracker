using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Application.Errors
{
    public class WorkEventAlreadyExistsError : Error
    {
        public WorkEventAlreadyExistsError(string message) : base(message)
        {
        }
    }
}
