using Abp.Application.Services.Dto;
using Practice_BoilerPlate.Employee.Dto;
using Practice_BoilerPlate.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Department.Dto
{
    public interface IDepartmentAppService
    {
        Task<PagedResultDto<GetDepartmentDto>> GetAll(GetAllAccountsInput input);
        Task CreateAsync(DepartmentCreateUpdateDto input);
        Task UpdateAsync(UpdateDepartmentDto input);
        Task DeleteAsync(EntityDto<int> input);
    }
}
