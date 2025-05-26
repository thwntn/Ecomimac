using System.Threading.Tasks;

namespace ReferenceFeature;

public class Startup
{
    public static async Task Configure(WebApplicationBuilder builder)
    {
        builder.Services.AddCors(setup =>
            setup.AddPolicy(
                nameof(Policy.Cors),
                policy =>
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetIsOriginAllowed(origin => true)
                        .AllowCredentials()
            )
        );

        builder.Services.AddDbContext<DatabaseContext>(options =>
        {
            string configure =
                nameof(ConfigurePgDatabase.Npgsql)
                + "."
                + nameof(ConfigurePgDatabase.EnableLegacyTimestampBehavior);
            AppContext.SetSwitch(configure, true);

            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            options.UseNpgsql(
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.Database)
                ),
                options =>
                    options.UseQuerySplittingBehavior(
                        QuerySplittingBehavior.SplitQuery
                    )
            );
        });

        builder.Services.AddControllers(options =>
        {
            options.MaxIAsyncEnumerableBufferLimit = int.MaxValue;
            options.Filters.Add<ExceptionFilter>();
        });

        builder
            .Services.AddControllers()
            .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling =
                    ReferenceLoopHandling.Ignore
            );

        builder
            .Services.AddAuthentication(configs =>
            {
                configs.DefaultAuthenticateScheme =
                    JwtBearerDefaults.AuthenticationScheme;
                configs.DefaultChallengeScheme =
                    JwtBearerDefaults.AuthenticationScheme;
                configs.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(configs =>
            {
                configs.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidIssuer = Environment.GetEnvironmentVariable(
                            nameof(EnvironmentNames.Issuer)
                        ),
                        ValidAudience = Environment.GetEnvironmentVariable(
                            nameof(EnvironmentNames.Audience)
                        ),
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(
                                Environment.GetEnvironmentVariable(
                                    nameof(EnvironmentNames.JwtKey)
                                )
                            )
                        ),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                    };
            });

        builder
            .Services.AddDataProtection()
            .UseCryptographicAlgorithms(
                new()
                {
                    EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
                    ValidationAlgorithm = ValidationAlgorithm.HMACSHA256,
                }
            );

        builder.Services.Configure<FormOptions>(options =>
            options.MultipartBodyLengthLimit = long.MaxValue
        );
        builder.WebHost.ConfigureKestrel(options =>
            options.Limits.MaxRequestBodySize = long.MaxValue
        );

        builder.Services.AddLogging(options =>
            options.AddFilter(nameof(Microsoft), LogLevel.Warning)
        );

        builder.Services.AddSignalR().AddNewtonsoftJsonProtocol();

        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc(
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.VersionSwagger)
                ),
                new()
                {
                    Title = Environment.GetEnvironmentVariable(
                        nameof(EnvironmentNames.SwaggerLabel)
                    ),
                }
            );
            options.CustomSchemaIds(scheme =>
                scheme.FullName.Replace(
                    Environment.GetEnvironmentVariable(
                        nameof(EnvironmentNames.SwaggerNameReplace)
                    ),
                    Environment.GetEnvironmentVariable(
                        nameof(EnvironmentNames.SwaggerNameTo)
                    )
                )
            );
            options.AddSecurityDefinition(
                Environment.GetEnvironmentVariable(
                    nameof(EnvironmentNames.TokenScheme)
                ),
                new OpenApiSecurityScheme
                {
                    Name = Environment.GetEnvironmentVariable(
                        nameof(EnvironmentNames.Authorization)
                    ),
                    In = ParameterLocation.Header,
                    Scheme = Environment.GetEnvironmentVariable(
                        nameof(EnvironmentNames.TokenScheme)
                    ),
                    Type = SecuritySchemeType.Http,
                }
            );
            options.AddSecurityRequirement(
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = Environment.GetEnvironmentVariable(
                                    nameof(EnvironmentNames.TokenScheme)
                                ),
                            },
                        },
                        []
                    },
                }
            );
        });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddControllers();

        builder.Services.AddHttpContextAccessor();
        builder.Services.AddMemoryCache();

        Repositories.Injection(builder.Services);
        Services.Injection(builder.Services);

        await RabbitMQ.Configure(builder);
        await CronJob.Configure(builder);
    }
}
