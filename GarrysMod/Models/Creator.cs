namespace GarrysMod.Models
{
    public class Creator
    {
        public int ID { get; set; }

        public string Username { get; set; }

        public ICollection<GarrysItem> Items { get; set; }
    }
}
