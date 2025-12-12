using GarrysMod.DTOs;
using GarrysMod.Models;

namespace GarrysMod.Interfaces
{
    public interface ICreator
    {
        Task<IEnumerable<DTO_Creator>> GetAllCreators();
        Task<DTO_Creator?> GetCreatorById(int id);
        Task<DTO_Creator> AddCreator(DTO_Creator creator);
        Task UpdateCreator(int id, DTO_Creator creator);
        Task DeleteCreator(int id);
    }
}
