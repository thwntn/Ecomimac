namespace Application;

public class Program
{
    public static async Task Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        Reader.Configure();
        await Startup.Configure(builder);

        WebApplication app = builder.Build();
        app.MapControllerRoute(string.Empty, string.Empty);

        app.UseCors(nameof(Policy.Cors));
        app.MapHub<SignalrController>(string.Empty);

        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint(
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.Swagger)
                ),
                string.Empty
            );
            options.RoutePrefix = Environment.GetEnvironmentVariable(
                nameof(EnvironmentNames.RouterPrefix)
            );
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseMiddleware<Sleep>();

        //
        // Summary:
        //       Print information when started host
        //
        // Returns:
        //
        //
        ReferenceFeature.Host.Information();
        app.Run(
            Environment.GetEnvironmentVariable(nameof(EnvironmentNames.Host))
        );
    }
}
