using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.FileUploads.Dto
{
    public class FileUpdateDto:Entity<int>
    {
        //public int Id { get; set; }

        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
