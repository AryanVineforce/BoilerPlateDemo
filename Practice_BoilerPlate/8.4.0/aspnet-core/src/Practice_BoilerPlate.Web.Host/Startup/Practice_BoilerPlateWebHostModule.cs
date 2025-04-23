using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Practice_BoilerPlate.Configuration;

namespace Practice_BoilerPlate.Web.Host.Startup
{
    [DependsOn(
       typeof(Practice_BoilerPlateWebCoreModule))]
    public class Practice_BoilerPlateWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public Practice_BoilerPlateWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(Practice_BoilerPlateWebHostModule).GetAssembly());
        }
    }
}
