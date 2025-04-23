using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice_BoilerPlate.Courses.Dto
{
    public class DeleteCOurseDto
    {
        public string Name { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public int Duration { get; set; }

        public decimal Fees { get; set; }
    }
}
