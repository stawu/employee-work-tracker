using EWT_Application.Out;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Persistence
{
    public static class PersistenceServiceConfiguration
    {
        public static void ConfigurePersistenceService(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EWTDbContext>(options =>
            {
                options.UseSqlite(configuration.GetConnectionString("SqliteConnection"));
            });

            services.AddTransient<IPersistEmployeePort, PersistEmployeeAdapter>();
            services.AddTransient<IPersistWorkEventPort, PersistWorkEventAdapter>();
        }

        public static void ConfigurePersistenceRuntime(IWebHostEnvironment env, EWTDbContext dbContext)
        {
            if (env.IsDevelopment())
            {
                dbContext.Database.EnsureCreated();
            }
        }
    }
}
