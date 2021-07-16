using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Persistence.Entities
{
    public class EmployeeEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
    }
}
