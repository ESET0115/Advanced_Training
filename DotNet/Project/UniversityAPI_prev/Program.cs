using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using UniversityAPI.Middleware;
using UniversityAPI.Models;
using UniversityAPI.Repositories.Implementations;
using UniversityAPI.Repositories.Interfaces;
using UniversityAPI.Services.Implementations;
using UniversityAPI.Services.Interfaces;

namespace UniversityAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            // Configure Swagger with JWT support
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "University API",
                    Version = "v1",
                    Description = "Database-First University Management API with JWT Authentication"
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // Database Context - Pure Database-First Approach
            builder.Services.AddDbContext<UniversityDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionDB")));

            // Repositories
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            builder.Services.AddScoped<IStudentRepository, StudentRepository>();
            builder.Services.AddScoped<ICourseRepository, CourseRepository>();

            // Services
            builder.Services.AddScoped<IAuthService, AuthService>();

            // JWT Authentication
            var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured");
            var jwtIssuer = builder.Configuration["Jwt:Issuer"];
            var jwtAudience = builder.Configuration["Jwt:Audience"];

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                    };
                });

            builder.Services.AddAuthorization();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<JwtMiddleware>();
            app.MapControllers();

            // ✅ PURE DATABASE-FIRST: Only verify connection and setup admin user
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<UniversityDbContext>();
                    var authService = services.GetRequiredService<IAuthService>();

                    Console.WriteLine("🔌 Testing database connection...");

                    // Simply test connection - NO database creation/migration
                    var canConnect = await context.Database.CanConnectAsync();

                    if (canConnect)
                    {
                        Console.WriteLine("✅ Database connection successful");

                        // Check existing data (read-only)
                        var courseCount = await context.Courses.CountAsync();
                        var studentCount = await context.Students.CountAsync();

                        Console.WriteLine($"📊 Database contains: {courseCount} courses, {studentCount} students");

                        // Setup admin user for authentication
                        var userRepository = services.GetRequiredService<IRepository<User>>();
                        var adminExists = await userRepository.FindAsync(u => u.Username == "admin");

                        if (!adminExists.Any())
                        {
                            await authService.RegisterAsync("admin", "admin123", "Admin");
                            Console.WriteLine("✅ Admin user created");
                        }
                        else
                        {
                            Console.WriteLine("✅ Admin user already exists");
                        }
                    }
                    else
                    {
                        Console.WriteLine("❌ Cannot connect to database");
                        Console.WriteLine("💡 Please ensure:");
                        Console.WriteLine("   - Database exists and is accessible");
                        Console.WriteLine("   - Connection string is correct");
                        Console.WriteLine("   - SQL Server is running");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"💥 Database error: {ex.Message}");
                    // Don't crash - just log and continue
                }
            }

            // Health check endpoint
            app.MapGet("/", () => "University API (Database-First) is running 🎓");

            app.Run();
        }
    }
}