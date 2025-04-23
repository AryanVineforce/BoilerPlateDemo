using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Practice_BoilerPlate.Students.Dto;
using Practice_BoilerPlate.Subjects.Dto;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Subjects
{
    public interface ISubjectApplicationService:IApplicationService
    {
        Task<PagedResultDto<GetSubjectDto>> GetAll(GetAllAccountsInput getAllAccountsInput);
        Task CreateAsync(CreateSubjectDto input);
        Task UpdateAsync(UpdateSubjectDto input);
        Task DeleteAsync(EntityDto<int> input);

    }
}
