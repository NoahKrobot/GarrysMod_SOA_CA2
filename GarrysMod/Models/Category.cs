namespace GarrysMod.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PopularityMeter { get; set; }
        public ICollection<GarrysItem> Items { get; set; } 
    }

}
