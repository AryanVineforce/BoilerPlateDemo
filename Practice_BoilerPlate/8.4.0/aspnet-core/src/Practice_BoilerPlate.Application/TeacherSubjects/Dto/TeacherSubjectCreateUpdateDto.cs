using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.TeacherSubjects.Dto
{
    public class TeacherSubjectCreateUpdateDto : EntityDto<int>
    {
        public int Id { get; set; }
        [Required]
        public int TeacherId { get; set; }
        [Required]

        public int SubjectId { get; set; }
    }
}
