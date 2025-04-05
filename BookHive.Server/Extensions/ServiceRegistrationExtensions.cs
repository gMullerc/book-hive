using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace BookHive.Server.Extensions
{
    public static class ServiceRegistrationExtensions
    {
        public static void AddServicesByConvention(this IServiceCollection services, Assembly assembly)
        {
            var types = assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Service"));

            foreach (var type in types)
            {
                var iface = type.GetInterface($"I{type.Name}");
                if (iface != null)
                {
                    services.AddScoped(iface, type);
                }
            }
        }
    }
}
