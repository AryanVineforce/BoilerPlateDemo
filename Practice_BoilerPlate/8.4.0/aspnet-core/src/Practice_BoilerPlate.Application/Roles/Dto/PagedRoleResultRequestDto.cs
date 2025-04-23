using Abp.Application.Services.Dto;

namespace Practice_BoilerPlate.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

