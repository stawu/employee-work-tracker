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

        public async Task<Result<IEnumerable<WorkEvent>>> GetWorkEventsOfEmployeeBetweenAsync(
            Guid employeeId, DateTime fromInclusive, DateTime toInclusive)
        {
            fromInclusive = fromInclusive.ToUniversalTime();
            toInclusive = toInclusive.ToUniversalTime();

            if(await EmployeeNotExists(employeeId))
                return Result.Fail(new EmployeeNotExistsError());

            return dbContext.WorkEvents
                .Where(workEvent => workEvent.EmployeeId == employeeId &&
                    workEvent.DateTimeInstant >= fromInclusive && workEvent.DateTimeInstant <= toInclusive)
                .Select(workEvent => new WorkEvent(workEvent.DateTimeInstant))
                .AsEnumerable()
                .ToResult();
        }

        public async Task<Result> SaveAsync(Guid employeeId, WorkEvent workEvent)
        {
            if (await EmployeeNotExists(employeeId))
                return Result.Fail(new EmployeeNotExistsError());

            if (await EmployeeAddedWorkEventAtTime(employeeId, workEvent.DateTimeInstant))
                return Result.Fail(new WorkEventAlreadyExistsError($"Employee: {employeeId} already have event with the same date time instant: {workEvent.DateTimeInstant}"));

            await dbContext.WorkEvents.AddAsync(new WorkEventEntity 
            {
                EmployeeId = employeeId,
                DateTimeInstant = workEvent.DateTimeInstant.ToUniversalTime()
            });

            await dbContext.SaveChangesAsync();

            return Result.Ok();
        }

        private async Task<bool> EmployeeNotExists(Guid employeeId) =>
            await dbContext.Employees.FindAsync(employeeId) == null;

        private async Task<bool> EmployeeAddedWorkEventAtTime(Guid employeeId, DateTime dateTimeInstance) 
            => await dbContext.WorkEvents.Where(w => w.EmployeeId == employeeId && w.DateTimeInstant == dateTimeInstance.ToUniversalTime()).AnyAsync();
    }
}
