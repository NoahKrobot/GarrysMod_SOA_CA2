using GarrysMod.Models;

namespace GarrysMod.DTOs
{
    public class DTO_GarrysItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatorUserName { get; set; }
        public int CreatorID { get; set; }
        public string MapName { get; set; }
        public string CategoryName { get; set; }






        public int Id { get; set; }
        public string Name { get; set; }
        public int PopularityMeter { get; set; }
        public ICollection<GarrysItem> Items { get; set; } = new List<GarrysItem>();
      
    }
}
