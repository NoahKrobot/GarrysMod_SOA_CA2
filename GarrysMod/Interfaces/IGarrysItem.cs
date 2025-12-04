using GarrysMod.Models;
using GarrysMod.DTOs;

namespace GarrysMod.Interfaces
{
    public interface IGarrysItem
    {
        Task<IEnumerable<DTO_GarrysItem>> GetAllItems();
        Task<DTO_GarrysItem?> GetItemById(long id);
        Task<DTO_GarrysItem> AddItem(GarrysItem item);
        Task UpdateItem(long id, GarrysItem item);
        Task DeleteItem(long id);
    }
}
