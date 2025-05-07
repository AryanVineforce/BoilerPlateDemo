using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Practice_BoilerPlate.Admissions.Dto;
using Practice_BoilerPlate.Employee.Dto;
using Practice_BoilerPlate.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Admissions
{
    internal interface IAdmissionAppService:IApplicationService
    {
        Task<PagedResultDto<GetAdmissionDto>> GetAll(GetAllAccountsInput getAllAccountsInput);
        Task CreateAsync(CreateUpdateAdmissionDto input);
        Task UpdateAsync(CreateUpdateAdmissionDto input);
        Task DeleteAsync(EntityDto<int> input);
    }
}
