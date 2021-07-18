using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EWT_Domain
{
    public class Employee : IdEntity
    {
        public Employee(Guid id, string name, string lastName) : this(name, lastName)
        {
            Id = id;
        }

        public Employee(string name, string lastName)
        {
            if (!Regex.IsMatch(name, "^[-a-zA-Z0-9-()]+$"))
                throw new FormatException("Wrong format of name: '" + name + "'!");

            if (!Regex.IsMatch(lastName, "^[-a-zA-Z0-9-()]+$"))
                throw new FormatException("Wrong format of lastName: '" + lastName + "'!");

            Name = name;
            LastName = lastName;
        }

        public string Name { get; }
        public string LastName { get; }
    }
}
