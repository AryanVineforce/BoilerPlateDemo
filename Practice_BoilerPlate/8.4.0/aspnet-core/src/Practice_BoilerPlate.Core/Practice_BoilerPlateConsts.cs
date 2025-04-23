using Practice_BoilerPlate.Debugging;

namespace Practice_BoilerPlate
{
    public class Practice_BoilerPlateConsts
    {
        public const string LocalizationSourceName = "Practice_BoilerPlate";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "b3f87528758844e3aaf020b464fecb45";
    }
}
