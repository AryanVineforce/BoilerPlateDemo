using Abp.Application.Services.Dto;
using Practice_BoilerPlate.Courses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Subjects.Dto
{
    public class CreateSubjectDto : EntityDto<int?>
    {
        public int TenantId { get; set; }
        public string Name { get; set; }

        public string Code { get; set; }

        public int Credits { get; set; }

        public int CourseId { get; set; }

            
    }
}
