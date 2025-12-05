using GarrysMod.DTOs;
using GarrysMod.Models;

namespace GarrysMod.Interfaces
{
    public interface IMap
    {
        Task<IEnumerable<DTO_Map>> GetAllMaps();
        Task<DTO_Map?> GetMapById(long id);
        Task<DTO_Map> AddMap(Map map);
        Task UpdateMap(long id, Map map);
        Task DeleteMap(long id);
    }
}
