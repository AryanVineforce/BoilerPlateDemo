using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Practice_BoilerPlate.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Addresses.Dto
{
    public interface IAddressApplicationService:IApplicationService
    {
        Task<PagedResultDto<GetAddressDto>> GetAll(GetAllAccountsInput getAllAccountsInput);
        Task CreateAsync(CreateAddressDto input);
        Task UpdateAsync(UpdateAddressDto input);
        Task DeleteAsync(EntityDto<int> input);
    }
}
