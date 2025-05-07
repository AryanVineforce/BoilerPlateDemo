using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using BoilerPlate_New.Beds;
using Practice_BoilerPlate.BedStatus.DTo;
using Practice_BoilerPlate.Enrollments.Dto;
using Practice_BoilerPlate.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.BedStatus
{
    public class BedStatusAppService:ApplicationService,IBedStatusAppSerive
    {
        private readonly IRepository<Bed> _bedsRepo;
        public BedStatusAppService(IRepository<Bed> _bedsRepo)
        {
            
        }

        public Task CreateAsync(EnrollmentCreateUpdateDto input)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(EntityDto<int> input)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResultDto<BedStatusPieChartDto>> GetAll(GetAllAccountsInput getAllAccountInput)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(EnrollmentCreateUpdateDto input)
        {
            throw new NotImplementedException();
        }

        Task<PagedResultDto<EnrollmentGetDto>> IEnrollmentsApplicationService.GetAll(GetAllAccountsInput getAllAccountInput)
        {
            throw new NotImplementedException();
        }
    }
}
