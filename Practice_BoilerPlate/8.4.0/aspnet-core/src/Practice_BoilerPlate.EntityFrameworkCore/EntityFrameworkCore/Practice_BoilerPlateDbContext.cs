using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Practice_BoilerPlate.Authorization.Roles;
using Practice_BoilerPlate.Authorization.Users;
using Practice_BoilerPlate.MultiTenancy;
using Practice_BoilerPlate.Students;
using Practice_BoilerPlate.Departments;
using Practice_BoilerPlate.Employees;
using Practice_BoilerPlate.Courses;

namespace Practice_BoilerPlate.EntityFrameworkCore
{
    public class Practice_BoilerPlateDbContext : AbpZeroDbContext<Tenant, Role, User, Practice_BoilerPlateDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public Practice_BoilerPlateDbContext(DbContextOptions<Practice_BoilerPlateDbContext> options)
            : base(options)
        {
        }
        public DbSet<Student> Student { get; set; }
        public DbSet<Departmentt> Departments { get; set; }
        public DbSet<Employeee> Employees { get; set; }
        public DbSet<Course> Courses { get; set; }
        
    }
}
