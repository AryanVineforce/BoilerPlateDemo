using System.Threading.Tasks;
using Abp.Application.Services;
using Practice_BoilerPlate.Sessions.Dto;

namespace Practice_BoilerPlate.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
