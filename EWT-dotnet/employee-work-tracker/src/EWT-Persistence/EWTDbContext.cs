using EWT_Persistence.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Persistence
{
    public class EWTDbContext : IdentityDbContext
    {
        public EWTDbContext(DbContextOptions<EWTDbContext> options) : base(options)
        { }

        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<WorkEventEntity> WorkEvents { get; set; }
    }
}
