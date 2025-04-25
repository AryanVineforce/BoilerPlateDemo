using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Practice_BoilerPlate.Students.Dto;
using Practice_BoilerPlate.Subjects.Dto;
using Practice_BoilerPlate.Teachers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.TeacherSubjects.Dto
{
    public interface ITeacherSubjectApplicationService :IApplicationService
    {
        Task<PagedResultDto<TeacherSubjectGetDto>> GetAll(GetAllAccountsInput getAllAccountInput);
        Task CreateAsync(TeacherSubjectCreateUpdateDto input);
        Task UpdateAsync(TeacherSubjectCreateUpdateDto input);
        Task DeleteAsync(EntityDto<int> input);
    }
}
