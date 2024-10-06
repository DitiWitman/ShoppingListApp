using DAL.Models;
using DAL.Interfaces;
using DAL.Services;
using BL.Interfaces;
using BL.BlApi;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Local
builder.Configuration.AddJsonFile("appsettings.Local.json", optional: false, reloadOnChange: true);
Console.WriteLine("Loaded appsettings.Local");
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("ConnectionString is not set.");
}

Console.WriteLine($"Connection String: {connectionString}");
// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<ShoppingListContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registration of services
builder.Services.AddScoped<IProductService, BL.BlApi.ProductService>();
builder.Services.AddScoped<IProductRepository, DAL.Services.ProductService>();
builder.Services.AddScoped<ICategoryService, BL.BlApi.CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthorization();
app.MapControllers();
app.Run();
