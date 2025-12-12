using GarrysMod.Models;
using GarrysMod.DTOs;

namespace GarrysMod.Interfaces
{
    public interface IGarrysItem
    {
        Task<IEnumerable<DTO_GarrysItem>> GetAllItems();
        Task<DTO_GarrysItem?> GetItemById(int id);
        Task<DTO_GarrysItem> AddItem(DTO_GarrysItem item);
        Task UpdateItem(int id, DTO_GarrysItem item);
        Task DeleteItem(int id);
    }
}
