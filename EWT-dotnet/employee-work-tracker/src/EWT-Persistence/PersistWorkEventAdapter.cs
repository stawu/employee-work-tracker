using EWT_Application.Errors;
using EWT_Application.Out;
using EWT_Domain;
using EWT_Persistence.Entities;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EWT_Persistence
{
    class PersistWorkEventAdapter : IPersistWorkEventPort
    {
        private readonly EWTDbContext dbContext;

        public PersistWorkEventAdapter(EWTDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Result> SaveAsync(Guid employeeId, WorkEvent workEvent)
        {
            EmployeeEntity? employeeEntity = await dbContext.Employees.FindAsync(employeeId);
            if (employeeEntity == null)
                return Result.Fail(new EmployeeNotExistsError());

            if (await EmployeeAddedWorkEventAtTime(employeeId, workEvent.DateTimeInstant))
                return Result.Fail(new WorkEventAlreadyExistsError($"Employee: {employeeId} already have event with the same date time instant: {workEvent.DateTimeInstant}"));

            await dbContext.WorkEvents.AddAsync(new WorkEventEntity 
            {
                EmployeeId = employeeId,
                DateTimeInstant = workEvent.DateTimeInstant
            });

            await dbContext.SaveChangesAsync();

            return Result.Ok();
        }

        private async Task<bool> EmployeeAddedWorkEventAtTime(Guid employeeId, DateTime dateTimeInstance) 
            => await dbContext.WorkEvents.Where(w => w.EmployeeId == employeeId && w.DateTimeInstant == dateTimeInstance).AnyAsync();
    }
}
