using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Employee.Dto
{
    public class EmployeeDto:Entity<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public string Position { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

        public int AddressId { get; set; }
    }
}
