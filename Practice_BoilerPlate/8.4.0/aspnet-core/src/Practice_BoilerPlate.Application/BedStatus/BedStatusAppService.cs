using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using BoilerPlate_New.Beds;
using Microsoft.EntityFrameworkCore;
using Practice_BoilerPlate.BedStatus.DTo;
using Practice_BoilerPlate.Students.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.BedStatus
{
    public class BedStatusAppService : ApplicationService, IBedStatusAppSerive
    {
        private readonly IRepository<Bed> _bedsRepo;
        public BedStatusAppService(IRepository<Bed> bedsRepo)
        {
            _bedsRepo = bedsRepo;
        }
        public async Task<List<BedStatusPieChartDto>> GetAll(GetAllAccountsInput input)
        {
            if (input.IsForChart)
            {
                var data = await _bedsRepo.GetAll()
                    .GroupBy(b => b.Status)
                    .Select(g => new BedStatusPieChartDto
                    {
                        Status = g.Key.ToString(),
                        Count = g.Count()
                    })
                    .ToListAsync();

                return data;
            }

            // Otherwise, handle regular paged list request (for bed table)
            throw new NotImplementedException("Regular list not implemented here.");
        }
    }
}
