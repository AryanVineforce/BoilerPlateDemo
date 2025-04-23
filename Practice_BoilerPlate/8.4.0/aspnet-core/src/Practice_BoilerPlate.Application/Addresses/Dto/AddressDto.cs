using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Addresses.Dto
{
    public class AddressDto: Entity<int>
    {
        public int TenantId { get; set; }
        
        public string Address1 { get; set; }

       
        public string Address2 { get; set; }

      
        public string Country { get; set; }

        public string State { get; set; }

       
        public string City { get; set; }
      
        public string PinCode { get; set; }
    }
}
