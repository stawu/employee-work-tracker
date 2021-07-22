using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EWT_Persistence.Entities
{
    public class WorkEventEntity
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateTimeInstant { get; set; }

        public Guid EmployeeId { get; set; }
        public virtual EmployeeEntity Employee { get; set; }
    }
}
