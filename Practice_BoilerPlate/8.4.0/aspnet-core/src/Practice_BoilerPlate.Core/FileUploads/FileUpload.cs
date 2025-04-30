using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.FileUploads
{
    public class FileUpload:FullAuditedEntity,IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
