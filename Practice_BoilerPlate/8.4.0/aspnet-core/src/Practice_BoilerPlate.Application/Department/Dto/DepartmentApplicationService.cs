using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Practice_BoilerPlate.Department.Dto;
using Practice_BoilerPlate.Departments;
using Practice_BoilerPlate.Students.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Department
{
    public class DepartmentApplicationService:ApplicationService,IDepartmentAppService
    {
        private readonly IRepository<Departmentt> _departmentrepository;
        public DepartmentApplicationService(IRepository<Departmentt> departmentrepository )
        {
            _departmentrepository = departmentrepository;

        }

        public async Task CreateAsync(DepartmentCreateUpdateDto input)
        {
            var department = new Departmentt
            {
                TenantId = (int)AbpSession.TenantId,
                Name = input.Name,
                Code = input.Code,
                Description = input.Description
            };

            await _departmentrepository.InsertAsync(department);
            // Make sure Id is generated

            
        }

        public async Task DeleteAsync(EntityDto<int> input)
        {
            await _departmentrepository.DeleteAsync(input.Id);
        }

        public async Task<PagedResultDto<GetDepartmentDto>> GetAll(GetAllAccountsInput input)
        {
            var query = _departmentrepository.GetAll();

            if (!string.IsNullOrWhiteSpace(input.Keyword))
            {
                query = query.Where(d =>
                    d.Name.Contains(input.Keyword) ||
                    d.Code.Contains(input.Keyword) ||
                    d.Description.Contains(input.Keyword));
            }

            var departments = await query.ToListAsync();

            var result = departments.Select(department => new GetDepartmentDto
            {
                Id = department.Id,
                Name = department.Name,
                Code = department.Code,
                Description = department.Description
            }).ToList();

            var totalCount = result.Count;

            return new PagedResultDto<GetDepartmentDto>(totalCount, result);
        }


        public async Task UpdateAsync(UpdateDepartmentDto input)
        {
            var department = await _departmentrepository.GetAsync(input.Id);
            department.Name = input.Name;
            department.Code = input.Code;
            department.Description = input.Description;

            await _departmentrepository.UpdateAsync(department);
        }


    }
}
