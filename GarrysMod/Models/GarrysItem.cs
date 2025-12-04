namespace GarrysMod.Models
{
    public class GarrysItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int CreatorId { get; set; }
        public Creator? Creator { get; set; }

        public int MapId { get; set; }
        public Map? Map { get; set; }

        //public ICollection<Map> Maps { get; set; } =  new List<Map>();

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

    }
}
