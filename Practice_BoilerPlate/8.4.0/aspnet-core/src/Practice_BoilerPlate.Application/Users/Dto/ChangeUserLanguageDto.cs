using System.ComponentModel.DataAnnotations;

namespace Practice_BoilerPlate.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}