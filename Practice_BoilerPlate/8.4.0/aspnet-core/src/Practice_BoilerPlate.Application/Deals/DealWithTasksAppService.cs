using Abp.Application.Services;
using Abp.Domain.Repositories;
using Practice_BoilerPlate.Deals.Dto;
using Practice_BoilerPlate.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Deals
{
    public class DealWithTasksAppService : ApplicationService, IDealWithTasksAppService
    {
        private readonly IRepository<Deal> _dealrepo;
        private readonly IRepository<Task_Item> _taskitemrepo;
        public DealWithTasksAppService(IRepository<Deal> dealrepo, IRepository<Task_Item> taskrepo)
        {

            _dealrepo = dealrepo;
            _taskitemrepo = taskrepo;
        }



     public async  Task<DealDto>CreateDealWithTasksAsync(CreateUpdateDealDto input)
        {
            var deal = new Deal
            {
                DealName = input.DealName,
                Date = input.Date
            };

            await _dealrepo.InsertAsync(deal);

            foreach (var taskDto in input.Tasks)
            {
                var task = new Task_Item
                {
                    TaskNo = "TASK-" + Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                    Title = taskDto.Title,
                    DateFrom = taskDto.DateFrom,
                    ToDate = taskDto.ToDate,
                    Description = taskDto.Description,
                    DealId = deal.Id
                };

                await _taskitemrepo.InsertAsync(task);
            }

            // Return DTO
            return new DealDto
            {
                Id = deal.Id,
                DealName = deal.DealName,
                Date = deal.Date
            };
        }
    }
}
        
