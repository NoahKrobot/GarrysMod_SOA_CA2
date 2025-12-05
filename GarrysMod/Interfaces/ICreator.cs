using GarrysMod.DTOs;
using GarrysMod.Models;

namespace GarrysMod.Interfaces
{
    public interface ICreator
    {
        Task<IEnumerable<DTO_Creator>> GetAllCreators();
        Task<DTO_Creator?> GetCreatorById(long id);
        Task<DTO_Creator> AddCreator(Creator creator);
        Task UpdateCreator(long id, Creator creator);
        Task DeleteCreator(long id);
    }
}
