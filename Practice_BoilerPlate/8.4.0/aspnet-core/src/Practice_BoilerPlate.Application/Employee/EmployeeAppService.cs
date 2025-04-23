using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using Practice_BoilerPlate.Employee.Dto;
using Practice_BoilerPlate.Employees;
using Practice_BoilerPlate.Students;
using Practice_BoilerPlate.Students.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Employee
{
    public class EmployeeAppService : ApplicationService, IEmployeeAppSerivce
    {
        private readonly IRepository<Employeee> _employeeRepository;
        public EmployeeAppService(IRepository<Employeee> repositoryEmployee)
        {
            _employeeRepository = repositoryEmployee;

        }
        public async Task CreateAsync(CreateUpdateEmployeDto input)
        {
            var employee = new Employeee
            {
                TenantId = (int)AbpSession.TenantId,
               FirstName=input.FirstName,
               LastName=input.LastName,
               Email=input.Email,
               PhoneNumber=input.PhoneNumber,
               DateOfBirth=input.DateOfBirth,
               HireDate=input.HireDate,
               Position=input.Position,
               Salary=input.Salary,
                DepartmentId = input.DepartmentId
                };
            await _employeeRepository.InsertAsync(employee);
        }
        public async Task DeleteAsync(EntityDto<int> input)
        {
            await _employeeRepository.DeleteAsync(input.Id);
        }
        public async Task<PagedResultDto<GetEmployeeDto>> GetAll(GetAllAccountsInput input)
        {
            var query = _employeeRepository
                .GetAllIncluding(e => e.Department) /// ABP ka function hai, jisse employee ke saath uska related Department bhi fetch hota hai (JOIN kar deta hai).
                .Where(e => e.Department != null);

            if (!string.IsNullOrWhiteSpace(input.Keyword))
            {
                query = query.Where(s =>
                    s.FirstName.Contains(input.Keyword) ||
                    s.LastName.Contains(input.Keyword) ||
                    s.Email.Contains(input.Keyword) ||
                    s.PhoneNumber.Contains(input.Keyword));
            }

            var employees = await query.ToListAsync();

            var result = employees.Select(employee => new GetEmployeeDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                PhoneNumber = employee.PhoneNumber,
                DateOfBirth = employee.DateOfBirth,
                HireDate = employee.HireDate,
                Position = employee.Position,
                Salary = employee.Salary,
                DepartmentId = employee.DepartmentId,
                DepartmentName = employee.Department?.Name
            }).ToList();

            return new PagedResultDto<GetEmployeeDto>(
                result.Count,
                result
            );
        }

        public async Task UpdateAsync(UpdateEmployeeDto input)
        {
            var employees = await _employeeRepository
      .GetAllIncluding(e => e.Department)
      .Where(e => e.Department != null)
      .ToListAsync();
            var employee = await _employeeRepository.FirstOrDefaultAsync(input.Id);
            if (employee == null)
            {
                throw new UserFriendlyException("Employee not found");
            }

            
            employee.FirstName = input.FirstName;
            employee.LastName = input.LastName;
            employee.Email = input.Email;
            employee.PhoneNumber = input.PhoneNumber;
            employee.DateOfBirth = input.DateOfBirth;
            employee.HireDate = input.HireDate;
            employee.Position = input.Position;
            employee.Salary = input.Salary;
            employee.DepartmentId = input.DepartmentId;
            employee.Department.Name = employee.Department.Name;
            await _employeeRepository.UpdateAsync(employee);
        }

       
    }
}
