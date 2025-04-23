using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Teachers.Dto
{
    public class TeacherGetDto: Entity<int>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        public string EmployeeID { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
