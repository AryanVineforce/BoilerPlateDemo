using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Practice_BoilerPlate.EntityFrameworkCore
{
    public static class Practice_BoilerPlateDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<Practice_BoilerPlateDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<Practice_BoilerPlateDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
