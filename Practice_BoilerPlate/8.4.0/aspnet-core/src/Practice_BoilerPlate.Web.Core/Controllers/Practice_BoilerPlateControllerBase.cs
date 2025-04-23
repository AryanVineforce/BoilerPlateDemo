using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Practice_BoilerPlate.Controllers
{
    public abstract class Practice_BoilerPlateControllerBase: AbpController
    {
        protected Practice_BoilerPlateControllerBase()
        {
            LocalizationSourceName = Practice_BoilerPlateConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
