using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;
namespace Practice_BoilerPlate.Teachers
{
    public class Teacher : FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }

        [Required]
        public string Name { get; set; }
   
        [StringLength(100)]
        public string EmployeeID { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
