namespace GarrysMod.Models
{
    public class Map
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; } 

        public double SizeInMB { get; set; }

        public ICollection<Creator> Creators { get; set; } 

    }
}
