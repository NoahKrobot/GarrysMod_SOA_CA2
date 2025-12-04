using Microsoft.EntityFrameworkCore;
using GarrysMod.Models;
using Microsoft.Extensions.Configuration;
using System;
using GarrysMod.Interfaces;
using GarrysMod.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//builder.Services.AddDbContext<ModContext>(opt =>
//opt.UseInMemoryDatabase("MoviesList"));
builder.Services.AddDbContext<ModContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IGarrysItem, GarrysItemService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
