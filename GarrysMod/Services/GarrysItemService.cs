using GarrysMod.Interfaces;
using GarrysMod.Models;
using Microsoft.EntityFrameworkCore;
using GarrysMod.DTOs;

namespace GarrysMod.Services
{
    public class GarrysItemService : IGarrysItem
    {

        private readonly ModContext _context;


        private DTO_GarrysItem DTOMapping(GarrysItem garrysItem)
        {
            return new DTO_GarrysItem
            {
                Id = garrysItem.Id,
                Title = garrysItem.Title,
                Description = garrysItem.Description,
                CreatorUserName = garrysItem.Creator?.Username ?? "No creator",
                CreatorID = garrysItem.CreatorId,
                MapName = garrysItem.Map?.Name ?? "No map",
                CategoryName = garrysItem.Category?.Name ?? "No category",
            };
        }


        public GarrysItemService(ModContext context)
        {
            _context = context;

            context.Database.EnsureCreated();
        }


        public async Task<IEnumerable<DTO_GarrysItem>> GetAllItems()
        {

            var items = await _context.Items
                .Include(i => i.Creator)
                .Include(i => i.Map)
                .Include(i => i.Category)
                .ToListAsync();

            if (items == null)
            {
                return null;
            }

            return items.Select(DTOMapping);
        }

        public async Task<DTO_GarrysItem> GetItemById(long id)
        {
            //var garrysItem = await _context.Items.FindAsync(id);

            var garrysItem = await _context.Items
              .Include(i => i.Creator)
              .Include(i => i.Map)
              .Include(i => i.Category).FirstOrDefaultAsync();

            if (garrysItem == null)
            {
                return null;
            }

            return DTOMapping(garrysItem);
        }


        public async Task<DTO_GarrysItem> AddItem(GarrysItem garrysItem)
        {

            _context.Items.Add(garrysItem);
            await _context.SaveChangesAsync();
            return DTOMapping(garrysItem);
        }

        public async Task UpdateItem(long id, GarrysItem garrysItem)
        {
            _context.Entry(garrysItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteItem(long id)
        {
            var garrysItem = await _context.Items.FindAsync(id);

            _context.Items.Remove(garrysItem);
            await _context.SaveChangesAsync();
        }

       
    }
}
