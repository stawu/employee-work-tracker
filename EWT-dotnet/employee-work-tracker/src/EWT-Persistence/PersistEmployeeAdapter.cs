using EWT_Application.Errors;
using EWT_Application.Out;
using EWT_Domain;
using EWT_Persistence.Entities;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EWT_Persistence
{
    public class PersistEmployeeAdapter : IPersistEmployeePort
    {
        private readonly EWTDbContext dbContext;

        public PersistEmployeeAdapter(EWTDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Result> DeleteAsync(Guid employeeId)
        {
            EmployeeEntity? employeeEntity = await dbContext.Employees.FindAsync(employeeId);
            if (employeeEntity == null)
                return Result.Fail(new EmployeeNotExistsError());

            dbContext.Employees.Remove(employeeEntity);
            await dbContext.SaveChangesAsync();

            return Result.Ok();
        }

        public Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return Task.FromResult(dbContext.Employees.AsEnumerable()
                .Select(e => new Employee(e.Id, e.Name, e.LastName)));
        }

        public async Task SaveAsync(Employee employee)
        {
            await dbContext.Employees.AddAsync(new EmployeeEntity 
            { 
                Name = employee.Name, 
                LastName = employee.LastName 
            });

            await dbContext.SaveChangesAsync();
        }
    }
}
