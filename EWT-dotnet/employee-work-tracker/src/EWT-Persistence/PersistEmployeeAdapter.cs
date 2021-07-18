﻿using EWT_Application.Out;
using EWT_Domain;
using EWT_Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Persistence
{
    public class PersistEmployeeAdapter : IPersistEmployeePort
    {
        private readonly EWTDbContext dbContext;

        public PersistEmployeeAdapter(EWTDbContext dbContext)
        {
            this.dbContext = dbContext;
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