using GarrysMod.Models;
using GarrysMod.DTOs;

namespace GarrysMod.Interfaces
{
    public interface ICategory
    {
        Task<IEnumerable<DTO_Category>> GetAllCategories();
        Task<DTO_Category?> GetCategoryById(int id);
        Task<DTO_Category> AddCategory(DTO_Category category);
        Task UpdateCategory(int id, DTO_Category category);
        Task DeleteCategory(int id);
    }
}
