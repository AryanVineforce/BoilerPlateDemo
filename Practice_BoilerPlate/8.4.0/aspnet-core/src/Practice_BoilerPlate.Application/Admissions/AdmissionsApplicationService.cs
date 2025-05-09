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
using System.Linq.Dynamic.Core;
using System.Security.Cryptography;
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
            var query = _addrepo.GetAllIncluding(x => x.Patient, x => x.Bed)
       .Where(x => x.TenantId == AbpSession.TenantId);

            // Filtering
            if (!string.IsNullOrWhiteSpace(input.Keyword))
            {
                query = query.Where(x =>
                    x.Patient.Name.Contains(input.Keyword) ||
                    x.Bed.BedNumber.Contains(input.Keyword) ||
                    x.Notes.Contains(input.Keyword)
                );
            }

            // Mapping UI sort field to actual entity fields
            var sortingMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        { "patientName", "Patient.Name" },
        { "bedNumber", "Bed.BedNumber" },
        { "admitDate", "AdmitDate" },
        { "dischargeDate", "DischargeDate" },
        { "notes", "Notes" }
    };

            string sorting = "AdmitDate desc"; // default sort

            if (!string.IsNullOrWhiteSpace(input.Sorting))
            {
                var sortParts = input.Sorting.Trim().Split(' ');
                var sortField = sortParts[0];
                var sortDirection = sortParts.Length > 1 ? sortParts[1] : "asc";

                if (sortingMap.ContainsKey(sortField))
                {
                    sorting = $"{sortingMap[sortField]} {sortDirection}";
                }
            }

            query = query.OrderBy(sorting);

            // Paging
            var totalCount = await query.CountAsync();

            var admissions = await query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            var items = admissions.Select(admission => new GetAdmissionDto
            {
                Id = admission.Id,
                PatientId = admission.PatientId,
                PatientName = admission.Patient?.Name ?? "",
                BedId = admission.BedId,
                BedNumber = admission.Bed?.BedNumber ?? "",
                AdmitDate = admission.AdmitDate,
                DischargeDate = admission.DischargeDate,
                Notes = admission.Notes
            }).ToList();

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
