using System.Threading.Tasks;
using Abp.Application.Services;
using Practice_BoilerPlate.Authorization.Accounts.Dto;

namespace Practice_BoilerPlate.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
