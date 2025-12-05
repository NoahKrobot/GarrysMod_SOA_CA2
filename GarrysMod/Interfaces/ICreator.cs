using GarrysMod.DTOs;
using GarrysMod.Models;

namespace GarrysMod.Interfaces
{
    public interface ICreator
    {
        Task<IEnumerable<DTO_Creator>> GetAllCreators();
        Task<DTO_Creator?> GetCreatorById(long id);
        Task<DTO_Creator> AddCreator(DTO_Creator creator);
        Task UpdateCreator(long id, DTO_Creator creator);
        Task DeleteCreator(long id);
    }
}
