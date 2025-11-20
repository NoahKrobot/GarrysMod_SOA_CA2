using Microsoft.EntityFrameworkCore;

namespace GarrysMod.Models
{
    public class ModContext : DbContext
    {
        public ModContext(DbContextOptions<ModContext> options): base(options) { }

        public DbSet<GarrysItem> Items { get; set; } = null;
    }
}
