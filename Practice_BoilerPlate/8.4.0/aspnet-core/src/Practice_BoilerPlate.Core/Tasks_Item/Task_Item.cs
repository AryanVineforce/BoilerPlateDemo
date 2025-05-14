using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Practice_BoilerPlate.Deals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Task
{
    public class Task_Item: FullAuditedEntity<int>, IMustHaveTenant

    {
        public  int TenantId { get; set; }
        public int TaskNo { get; set; }
        public string Title { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime ToDate { get; set; }
        public string Description { get; set; }

        public int DealId { get; set; }
        public Deal Deal { get; set; }

        public static implicit operator Task_Item(Task_Item v)
        {
            throw new NotImplementedException();
        }
    }
}
