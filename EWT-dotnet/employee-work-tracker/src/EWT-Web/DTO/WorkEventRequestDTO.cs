using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWT_Web.DTO
{
    public struct WorkEventRequestDTO
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required]
        public DateTime dateTimeInstant { get; set; }
    }
}
