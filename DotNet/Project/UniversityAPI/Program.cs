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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "University API",
        Version = "v1",
        Description = "Database-First University Management API"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
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
            new string[] {}
        }
    });
});

// Database Context - Database First Approach
builder.Services.AddDbContext<UniversityDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionDB")));

// Repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"];
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

// ✅ DATABASE-FIRST APPROACH: Just verify connection and data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<UniversityDbContext>();
        var authService = services.GetRequiredService<IAuthService>();
        var userRepository = services.GetRequiredService<IRepository<User>>();

        Console.WriteLine("🔌 Testing database connection...");

        // Just test if we can connect - don't create or migrate
        var canConnect = await context.Database.CanConnectAsync();

        if (canConnect)
        {
            Console.WriteLine("✅ Database connection successful!");

            // Check what data we have
            var courseCount = await context.Courses.CountAsync();
            var studentCount = await context.Students.CountAsync();

            Console.WriteLine($"📊 Found {courseCount} courses and {studentCount} students in existing database");

            // Create admin user if it doesn't exist
            var adminUsers = await userRepository.FindAsync(u => u.Username == "admin");
            if (!adminUsers.Any())
            {
                await authService.RegisterAsync("admin", "admin123", "Admin");
                Console.WriteLine("✅ Admin user created: username: 'admin', password: 'admin123'");
            }
            else
            {
                Console.WriteLine("✅ Admin user already exists");
            }
        }
        else
        {
            Console.WriteLine("❌ Cannot connect to database. Please check:");
            Console.WriteLine("   - SQL Server is running");
            Console.WriteLine("   - UniversityDB database exists");
            Console.WriteLine("   - Connection string in appsettings.json is correct");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"💥 Database error: {ex.Message}");
        // Don't crash the app - just log the error
    }
}

// Simple health check endpoint
app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        message = "University API is running 🎓",
        approach = "Database-First",
        timestamp = DateTime.UtcNow
    });
});

// Database info endpoint
app.MapGet("/db-info", async (UniversityDbContext context) =>
{
    try
    {
        var canConnect = await context.Database.CanConnectAsync();
        var courseCount = await context.Courses.CountAsync();
        var studentCount = await context.Students.CountAsync();

        return Results.Ok(new
        {
            databaseConnected = canConnect,
            courses = courseCount,
            students = studentCount,
            database = context.Database.GetDbConnection().Database
        });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Database error: {ex.Message}");
    }
});

Console.WriteLine("🚀 Starting University API (Database-First Approach)...");
app.Run();