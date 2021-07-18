using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWT_Web.DTO
{
    public struct EmployeeRequestDTO
    {
        [Required(AllowEmptyStrings = false)]
        [RegularExpression(@"^[-a-zA-Z0-9-()]+$")]
        public string Name { get; set; }

        [Required(AllowEmptyStrings = false)]
        [RegularExpression(@"^[-a-zA-Z0-9-()]+$")]
        public string LastName { get; set; }
    }
}
