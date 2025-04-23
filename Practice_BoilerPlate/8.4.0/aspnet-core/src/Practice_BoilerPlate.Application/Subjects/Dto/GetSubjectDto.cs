using Abp.Domain.Entities;
using Practice_BoilerPlate.Courses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Subjects.Dto
{
    public class GetSubjectDto : Entity<int>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public int Credits { get; set; }

        public int CourseId { get; set; }

        public Course Course { get; set; }
        public string CourseName { get; set; }
    }
}
