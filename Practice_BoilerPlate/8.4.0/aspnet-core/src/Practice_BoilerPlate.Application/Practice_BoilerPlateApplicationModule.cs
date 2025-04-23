using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Practice_BoilerPlate.Authorization;

namespace Practice_BoilerPlate
{
    [DependsOn(
        typeof(Practice_BoilerPlateCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class Practice_BoilerPlateApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<Practice_BoilerPlateAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(Practice_BoilerPlateApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
