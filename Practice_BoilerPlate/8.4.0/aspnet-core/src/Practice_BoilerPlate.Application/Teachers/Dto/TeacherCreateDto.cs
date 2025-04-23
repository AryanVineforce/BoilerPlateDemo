using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Teachers.Dto
{
    public class TeacherCreateDto: EntityDto<int?>
    {
        public int TenantId { get; set; }
        [Required]
        public string Name { get; set; }


        public string EmployeeID { get; set; }

        public string Email { get; set; }
    }
}
