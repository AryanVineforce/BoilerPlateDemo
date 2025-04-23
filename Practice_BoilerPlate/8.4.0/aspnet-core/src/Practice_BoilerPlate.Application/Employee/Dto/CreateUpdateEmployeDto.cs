using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Employee.Dto
{
    public class CreateUpdateEmployeDto:EntityDto<int?>
    {

        public int TenantId { get; set; }
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, Phone]
        public string PhoneNumber { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime HireDate { get; set; }

        [Required]
        public string Position { get; set; }

        public decimal Salary { get; set; }

        [Required]
        public int DepartmentId { get; set; }
        //public string DepartmentName { get; set; }
        public int AddressId { get; set; }

    }
}
