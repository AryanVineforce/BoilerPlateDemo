using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Practice_BoilerPlate.Addmissions;
using Practice_BoilerPlate.Admissions.Dto;
using Practice_BoilerPlate.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Admissions
{
    public class AdmissionsApplicationService:ApplicationService,IAdmissionAppService

    {
        private readonly IRepository<Addmisson> _addrepo;
        public AdmissionsApplicationService(IRepository<Addmisson> addrepo)
        {
            _addrepo = addrepo;
        }

        public async Task CreateAsync(CreateUpdateAdmissionDto input)
        {
            var admission = new Addmisson
            {

                TenantId = (int)AbpSession.TenantId,
                PatientId = input.PatientId,
                BedId = input.BedId,
                AdmitDate = input.AdmitDate,
                DischargeDate = input.DischargeDate,
                Notes = input.Notes
            };

            await _addrepo.InsertAsync(admission);
        }

        public Task DeleteAsync(EntityDto<int> input)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResultDto<GetAdmissionDto>> GetAll(GetAllAccountsInput input)
        {
            var query = _addrepo.GetAllIncluding(e => e.Patient, e => e.Bed);

            // If there’s a search keyword, filter employees based on the keyword
            if (!string.IsNullOrWhiteSpace(input.Keyword))
            {
                query = query.Where(s =>
                   s.Notes.Contains(input.Keyword) ||
            s.Patient.Name.Contains(input.Keyword) ||
            s.Bed.BedNumber.Contains(input.Keyword)

            );
            }

            // Get total count of employees after filtering (for pagination)
            var totalCount = await query.CountAsync();

            // Fetch the list of employees based on pagination parameters
            var admissions = await query
                .OrderBy(e => e.Notes) // Sort by first name
                .Skip(input.SkipCount)     // Skip records based on pagination
                .Take(input.MaxResultCount) // Take the desired number of records
                .ToListAsync();

            // Map to DTOs
            var items = admissions.Select(admission => new GetAdmissionDto
            {
                Id = admission.Id,
                PatientId = admission.PatientId,
                PatientName = admission.Patient?.Name ?? "Unknown",
                BedId = admission.BedId,
                BedNumber = admission.Bed?.BedNumber ?? "Unknown",
                AdmitDate = admission.AdmitDate,
                DischargeDate = admission.DischargeDate,
                Notes = admission.Notes
            }).ToList();

            // Return paged result
            return new PagedResultDto<GetAdmissionDto>(totalCount, items);
        }

        public async Task UpdateAsync(CreateUpdateAdmissionDto input)
        {
            var admission = await _addrepo.GetAsync((int)input.Id);

            // Update properties
            admission.PatientId = input.PatientId;
            admission.BedId = input.BedId;
            admission.AdmitDate = input.AdmitDate;
            admission.DischargeDate = input.DischargeDate;
            admission.Notes = input.Notes;

            await _addrepo.UpdateAsync(admission);
        }
    }
}
