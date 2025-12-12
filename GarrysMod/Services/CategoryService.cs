using GarrysMod.DTOs;
using GarrysMod.Interfaces;
using GarrysMod.Models;
using Humanizer;
using Microsoft.EntityFrameworkCore;

namespace GarrysMod.Services
{
    public class CategoryService : ICategory
    {
        private readonly ModContext _context;


        private DTO_Category DTOMapping(Category category)
        {
            return new DTO_Category
            {
                ID = category.Id,
                Name = category.Name,
                PopularityMeter = category.PopularityMeter,
            };
        }

        public CategoryService(ModContext context)
        {
            _context = context;

            context.Database.EnsureCreated();
        }

        public ModContext Get_context()
        {
            return _context;
        }

        public async Task<IEnumerable<DTO_Category>> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories.Select(DTOMapping);
        }
        public async Task<DTO_Category?> GetCategoryById(int id)
        {

            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return null;
            }

            return DTOMapping(category);

        }

        public async Task<DTO_Category> AddCategory(DTO_Category category)
        {

            var categoryObject = new Category
            {
                Name = category.Name,
                PopularityMeter = category.PopularityMeter,
                Items = null
            };

            _context.Categories.Add(categoryObject);
            await _context.SaveChangesAsync();

            return DTOMapping(categoryObject);
        }

        public async Task UpdateCategory(int id, DTO_Category categoryDTO)
        {
            var categoryFound = await _context.Categories.FindAsync(id);
          
            categoryFound.Name = categoryDTO.Name;
            categoryFound.PopularityMeter = categoryDTO.PopularityMeter;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}
