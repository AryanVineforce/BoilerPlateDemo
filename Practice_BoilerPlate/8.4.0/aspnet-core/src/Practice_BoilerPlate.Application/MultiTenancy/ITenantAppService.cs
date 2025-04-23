using Abp.Application.Services;
using Practice_BoilerPlate.MultiTenancy.Dto;

namespace Practice_BoilerPlate.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

