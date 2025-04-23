using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Addresses
{
    public class Address : FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        [Required]
        [StringLength(200)]
        public string Address1 { get; set; }

        [StringLength(200)]
        public string Address2 { get; set; }

        [Required]
        [StringLength(100)]
        public string Country { get; set; }

        [Required]
        [StringLength(100)]
        public string State { get; set; }

        [Required]
        [StringLength(100)]
        public string City { get; set; }
        [Required]
        [StringLength(10)] 
        public string PinCode { get; set; }


    }
}
