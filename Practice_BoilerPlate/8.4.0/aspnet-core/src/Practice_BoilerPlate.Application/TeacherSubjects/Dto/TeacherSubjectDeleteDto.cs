using Practice_BoilerPlate.Courses;
using Practice_BoilerPlate.Subjects;
using Practice_BoilerPlate.Teachers;

namespace Practice_BoilerPlate.TeacherSubjects.Dto
{
    public class TeacherSubjectDeleteDto
    {
    

        public int SubjectId { get; set; }

        public Subject Subject { get; set; }

        public int TeacherId { get; set; }

        public Teacher Teacher { get; set; }
    }
}
