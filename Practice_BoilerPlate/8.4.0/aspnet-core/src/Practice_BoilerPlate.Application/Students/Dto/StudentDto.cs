using Abp.Domain.Entities;
using Practice_BoilerPlate.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Students.Dto
{
    public class StudentDto: Entity<int>
    {
       
        // Student's Name
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        // Student's RollNumber
        [Required]
        [MaxLength(50)]
        public string RollNumber { get; set; }

        // Student's Age
        public int Age { get; set; }

        // Student's Date of Birth
        public DateTime DOB { get; set; }

        // Student's Gender
        public Gender Gender { get; set; }

        // Student's Email
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Phone(ErrorMessage = "Invalid phone number.")]
        public string PhoneNumber { get; set; }

        // Indicates if the Student is Active
        public bool IsActive { get; set; }
    }
}
