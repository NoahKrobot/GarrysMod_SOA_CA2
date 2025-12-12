using Microsoft.EntityFrameworkCore;

namespace GarrysMod.Models
{
    public class ModContext : DbContext
    {
        // One Map -> many items
        // One Creator -> many items
        // One Category -> many items

        public DbSet<GarrysItem> Items { get; set; }
        public DbSet<Creator> Creators { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Category> Categories { get; set; }

        public ModContext(DbContextOptions<ModContext> options): base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Creator>().HasData(
               new Creator()
               {
                   ID = 1,
                   Username = "Facepunch",
                   Password = "password",
                   IsAdmin =  true
               },

                new Creator()
                {
                    ID = 2,
                    Username = "Valve",
                    Password = "password",
                    IsAdmin = false
                }
           );


            modelBuilder.Entity<Map>().HasData(
            new Map()
            {
                Id = 1,
                Name = "gm_construct",
                Description = "The classic sandbox testing map",
                SizeInMB = 45.25
            },

            new Map()
            {
                Id = 2,
                Name = "gm_construct_v13_beta",
                Description = "The classic sandbox testing map containing all deleted features",
                SizeInMB = 245.25
            }
            
            
            );


            modelBuilder.Entity<Category>().HasData(
               new Category()
               {
                   Id = 1,
                   Name = "Weapon",
                   PopularityMeter = 9,
               },

                new Category()
                {
                    Id = 2,
                    Name = "Tool",
                    PopularityMeter = 8,
                },

                  new Category()
                  {
                      Id = 3,
                      Name = "Vehicle",
                      PopularityMeter = 3,
                  }
            );

            modelBuilder.Entity<GarrysItem>().HasData(
               new GarrysItem()
               {
                   Id = 1,
                   Title = "Gravity Gun",
                   Description = "A physics manipulation device.",
                   CreatorId = 1,
                   MapId = 1,
                   CategoryId = 1,
               },

                new GarrysItem()
                {
                    Id = 2,
                    Title = "Tool Gun",
                    Description = "A versatile tool for editing objects.",
                    CreatorId = 2,
                    MapId = 2,
                    CategoryId = 2,
                }
           );
        }
    }
}
