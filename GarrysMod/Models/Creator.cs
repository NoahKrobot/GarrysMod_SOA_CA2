namespace GarrysMod.Models
{
    public class Creator
    {
        public int ID { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }

        public bool IsAdmin { get; set; }

        public ICollection<GarrysItem> Items { get; set; } = new List<GarrysItem>();
    }
}
