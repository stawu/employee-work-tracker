using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWT_Web.DTO
{
    public struct EmployeeResponseDTO
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public String LastName { get; set; }
    }
}
