using GarrysMod.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GarrysMod.Interfaces
{
    public interface IGarrysItem
    {
        Task<IEnumerable<GarrysItem>> GetAllItems();
        Task<GarrysItem?> GetItemById(long id);
        Task<GarrysItem> AddItem(GarrysItem item);
        Task UpdateItem(long id, GarrysItem item);
        Task DeleteItem(long id);
    }
}
