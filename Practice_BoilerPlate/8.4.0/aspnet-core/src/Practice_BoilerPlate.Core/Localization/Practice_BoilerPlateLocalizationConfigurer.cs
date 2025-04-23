using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace Practice_BoilerPlate.Localization
{
    public static class Practice_BoilerPlateLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(Practice_BoilerPlateConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(Practice_BoilerPlateLocalizationConfigurer).GetAssembly(),
                        "Practice_BoilerPlate.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
