using GarrysMod.Models;
using GarrysMod.DTOs;

namespace GarrysMod.Interfaces
{
    public interface ICategory
    {
        Task<IEnumerable<DTO_Category>> GetAllCategories();
        Task<DTO_Category?> GetCategoryById(long id);
        Task<DTO_Category> AddCategory(DTO_Category category);
        Task UpdateCategory(long id, DTO_Category category);
        Task DeleteCategory(long id);
    }
}
