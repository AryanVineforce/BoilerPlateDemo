using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Practice_BoilerPlate.Teachers.Dto
{
    public class TeacherDTO:Entity<int>
    {
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        public string EmployeeID { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
