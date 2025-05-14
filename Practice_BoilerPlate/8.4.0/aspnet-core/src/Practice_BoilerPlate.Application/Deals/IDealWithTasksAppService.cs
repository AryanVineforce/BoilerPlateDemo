using Abp.Application.Services;
using Practice_BoilerPlate.Deals.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Deals
{
    public interface IDealWithTasksAppService :IApplicationService
    {
        Task<DealDto> CreateDealWithTasksAsync(CreateUpdateDealDto input);
    }
}
