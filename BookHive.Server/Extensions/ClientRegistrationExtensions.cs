using System.Reflection;

namespace BookHive.Server.Extensions
{
    public static class ClientRegistrationExtensions
    {
        public static void AddClientsByConvention(this IServiceCollection services, Assembly assembly)
        {
            var types = assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Client"));

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
