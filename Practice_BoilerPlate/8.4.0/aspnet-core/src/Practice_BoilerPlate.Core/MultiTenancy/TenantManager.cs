using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using Practice_BoilerPlate.Authorization.Users;
using Practice_BoilerPlate.Editions;

namespace Practice_BoilerPlate.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        public TenantManager(
            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore)
        {
        }
    }
}
