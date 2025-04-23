using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Practice_BoilerPlate.EntityFrameworkCore;
using Practice_BoilerPlate.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Practice_BoilerPlate.Web.Tests
{
    [DependsOn(
        typeof(Practice_BoilerPlateWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class Practice_BoilerPlateWebTestModule : AbpModule
    {
        public Practice_BoilerPlateWebTestModule(Practice_BoilerPlateEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(Practice_BoilerPlateWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(Practice_BoilerPlateWebMvcModule).Assembly);
        }
    }
}