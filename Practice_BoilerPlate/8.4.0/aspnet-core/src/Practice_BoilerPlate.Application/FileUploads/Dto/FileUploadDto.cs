using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.FileUploads.Dto
{
    public class FileUploadDto :Entity<int>
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
