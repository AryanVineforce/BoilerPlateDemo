using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Practice_BoilerPlate.Courses
{
    public class Course: FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        [Required]
        [StringLength(100)]
       public string Name { get; set; }

        [StringLength(255)]
        public string Description { get; set; }
 
        public int Duration { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Fees { get; set; } 
    }
}
