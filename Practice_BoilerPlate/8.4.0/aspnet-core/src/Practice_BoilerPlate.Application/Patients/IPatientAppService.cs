﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using BoilerPlate_New.Beds.Dto;
using Practice_BoilerPlate.Patients.Dto;
using Practice_BoilerPlate.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Patients
{
    public interface IPatientAppService:IApplicationService
    {
        Task<PagedResultDto<GetPatientDto>> GetAll(GetAllAccountsInput input);
        Task CreateAsync(CreateUpdatePatientDto input);
  
        Task UpdateAsync(CreateUpdatePatientDto input);
        Task DeleteAsync(EntityDto<int> input);
        

    }
}
