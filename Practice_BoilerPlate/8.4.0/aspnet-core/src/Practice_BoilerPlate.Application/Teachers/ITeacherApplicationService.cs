using Abp.Application.Services;
using Abp.Application.Services.Dto;

using Practice_BoilerPlate.Students.Dto;
using Practice_BoilerPlate.Teachers.Dto;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Teachers
{
    public interface ITeacherApplicationService:IApplicationService
    {
        Task<PagedResultDto<TeacherGetDto>> GetAll(GetAllAccountsInput getAllAccountsInput);
        Task CreateAsync(TeacherCreateDto input);
        Task UpdateAsync(TeacherUpdateDto input);
        Task DeleteAsync(EntityDto<int> input); //input is just an object that holds an int Id.
    }
}
