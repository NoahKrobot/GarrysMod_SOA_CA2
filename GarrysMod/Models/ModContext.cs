using Microsoft.EntityFrameworkCore;

namespace GarrysMod.Models
{
    public class ModContext : DbContext
    {
        public DbSet<GarrysItem> Items { get; set; } = null;
        public DbSet<Creator> Creators { get; set; } = null;
        public DbSet<Map> Maps { get; set; } = null;

        public ModContext(DbContextOptions<ModContext> options): base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GarrysItem>().HasData(
                new GarrysItem()
                {
                    Id = 1,
                    Title = "Gravity Gun",
                    Description = "A physics manipulation device."
                },

                 new GarrysItem()
                 {
                     Id = 2,
                     Title = "Tool Gun",
                     Description = "A versatile tool for editing objects."
                 }
            );


            modelBuilder.Entity<Creator>().HasData(
               new Creator()
               {
                   ID = 1,
                   Username = "Facepunch"
               },

                new Creator()
                {
                    ID = 2,
                    Username = "Valve"
                }
           );


            modelBuilder.Entity<Map>().HasData(
            new Map()
            {
                Id = 1,
                Name = "gm_construct",
                Description = "The classic sandbox testing map",
                SizeInMB = 45.25
            });
        }
    }
}
