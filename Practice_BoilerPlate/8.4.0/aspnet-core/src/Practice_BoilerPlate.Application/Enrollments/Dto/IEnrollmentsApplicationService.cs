using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Practice_BoilerPlate.Students.Dto;
using System.Threading.Tasks;


namespace Practice_BoilerPlate.Enrollments.Dto
{
    public interface IEnrollmentsApplicationService:IApplicationService
    {
        Task<PagedResultDto<EnrollmentGetDto>> GetAll(GetAllAccountsInput getAllAccountInput);
        Task CreateAsync(EnrollmentCreateUpdateDto input);
        Task UpdateAsync(EnrollmentCreateUpdateDto input);
        Task DeleteAsync(EntityDto<int> input);
    }
}
