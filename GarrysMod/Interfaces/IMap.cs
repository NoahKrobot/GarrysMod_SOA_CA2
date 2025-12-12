using GarrysMod.DTOs;
using GarrysMod.Models;

namespace GarrysMod.Interfaces
{
    public interface IMap
    {
        Task<IEnumerable<DTO_Map>> GetAllMaps();
        Task<DTO_Map?> GetMapById(int id);
        Task<DTO_Map> AddMap(DTO_Map map);
        Task UpdateMap(int id, DTO_Map map);
        Task DeleteMap(int id);
    }
}
