using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Practice_BoilerPlate.Courses;
using Practice_BoilerPlate.Subjects;
using Practice_BoilerPlate.Teachers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.TeacherSubjects
{
    public class TeacherSubject: FullAuditedEntity, IMustHaveTenant
    {

        public int TenantId { get; set; }

        public int TeacherId { get; set; }

        public Teacher Teacher { get; set; }


        public int  SubjectId { get; set; }

        public Subject Subject { get; set; }
    }
}
