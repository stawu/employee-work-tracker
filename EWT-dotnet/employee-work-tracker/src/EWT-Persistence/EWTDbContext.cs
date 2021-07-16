﻿using EWT_Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Persistence
{
    public class EWTDbContext : DbContext
    {
        public EWTDbContext(DbContextOptions<EWTDbContext> options) : base(options)
        { }

        public DbSet<EmployeeEntity> Employees { get; set; }
    }
}
