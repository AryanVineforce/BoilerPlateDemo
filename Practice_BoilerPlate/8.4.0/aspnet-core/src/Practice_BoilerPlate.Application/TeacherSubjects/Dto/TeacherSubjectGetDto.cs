using Abp.Domain.Entities;
using Practice_BoilerPlate.Courses;
using Practice_BoilerPlate.Subjects;
using Practice_BoilerPlate.Teachers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.TeacherSubjects.Dto
{
    public class TeacherSubjectGetDto:Entity<int>
    {

        public int Id { get; set; }
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public string TeacherName { get; set; }

        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        public string SubjectName { get; set; }
    }
}
