using Abp.Application.Services;
using Abp.Application.Services.Dto;

using Practice_BoilerPlate.Students.Dto;

using System.Threading.Tasks;

namespace Practice_BoilerPlate.Students
{
    public interface IStudentAppService: IApplicationService
    {
        Task<PagedResultDto<GetStudentDto>> GetAll(GetAllAccountsInput getAllAccountsInput);
        Task CreateAsync(CreateStudentDto input);
        Task UpdateAsync(UpdateStudentDto input);
        Task DeleteAsync(EntityDto<int> input);

    }
}
