using GarrysMod.DTOs;
using GarrysMod.Interfaces;
using GarrysMod.Models;
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
                PopulatiryMeter = category.PopularityMeter,
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
        public async Task<DTO_Category?> GetCategoryById(long id)
        {

            var category = await _context.Categories.FirstOrDefaultAsync();

            if (category == null)
            {
                return null;
            }

            return DTOMapping(category);

        }

        public async Task<DTO_Category> AddCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return DTOMapping(category);
        }

        public async Task UpdateCategory(long id, Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategory(long id)
        {
            var category = await _context.Categories.FindAsync(id);

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}
