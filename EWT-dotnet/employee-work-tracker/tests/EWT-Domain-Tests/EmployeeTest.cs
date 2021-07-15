using EWT_Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EWT_Domain_Tests
{
    public class EmployeeTest
    {
        [Fact]
        public void RequireNameAndLastName()
        {
            const string name = "NAME";
            const string lastName = "LASTNAME";

            Employee employee = new Employee(name, lastName);

            Assert.Equal(name, employee.Name);
            Assert.Equal(lastName, employee.LastName);
        }

        [Fact]
        public void NameAndLastNameAreSingleWord()
        {
            const string properLastName = "LASTNAME";

            Assert.Throws<FormatException>(() => new Employee("Name ", properLastName));
            Assert.Throws<FormatException>(() => new Employee("Name C", properLastName));
            Assert.Throws<FormatException>(() => new Employee(" Name", properLastName));
            Assert.Throws<FormatException>(() => new Employee("Q Name", properLastName));
            Assert.Throws<FormatException>(() => new Employee(" ", properLastName));

            const string properName = "NAME";

            Assert.Throws<FormatException>(() => new Employee(properName, "LastName "));
            Assert.Throws<FormatException>(() => new Employee(properName, "LastName C"));
            Assert.Throws<FormatException>(() => new Employee(properName, " LastName"));
            Assert.Throws<FormatException>(() => new Employee(properName, "Q LastName"));
            Assert.Throws<FormatException>(() => new Employee(properName, " "));

            Assert.Throws<FormatException>(() => new Employee(" ", " "));
        }

        [Fact]
        public void NameAndLastNameDontHaveSpecialCharacters()
        {
            const string properLastName = "LASTNAME";
            const string properName = "NAME";

            const string specialCharacters = @"@#&|/\^";

            foreach(char c in specialCharacters)
            {
                Assert.Throws<FormatException>(() => new Employee(c.ToString(), properLastName));
                Assert.Throws<FormatException>(() => new Employee(properName, c.ToString()));
            }
        }

        [Fact]
        public void DefaultIdIsNull()
        {
            Employee employee = new Employee("Name", "LastName");
            Assert.Null(employee.Id);
        }

        [Fact]
        public void PermitToSetIdOnlyInConstrcutor()
        {
            const ulong id = 1; 

            Employee employee = new Employee(id, "Name", "LastName");
            Assert.Equal(id, employee.Id);
        }
    }
}
