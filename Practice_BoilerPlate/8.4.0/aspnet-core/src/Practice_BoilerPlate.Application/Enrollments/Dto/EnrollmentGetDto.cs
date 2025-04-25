using Practice_BoilerPlate.Courses;
using Practice_BoilerPlate.Students;
using Practice_BoilerPlate.Subjects;
using Practice_BoilerPlate.Teachers;

namespace Practice_BoilerPlate.Enrollments.Dto
{
    public class EnrollmentGetDto
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public string StudentName { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }
        public string CourseName { get; set; }
    }
}
