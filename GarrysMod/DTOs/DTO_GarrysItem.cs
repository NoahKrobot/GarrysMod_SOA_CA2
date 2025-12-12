using GarrysMod.Models;

namespace GarrysMod.DTOs
{
    public class DTO_GarrysItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CreatorID { get; set; }
        public int MapID { get; set; }
        public int CategoryID { get; set; }
    }
}
