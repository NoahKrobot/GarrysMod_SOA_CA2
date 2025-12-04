using GarrysMod.Interfaces;
using GarrysMod.Models;
using Microsoft.EntityFrameworkCore;

namespace GarrysMod.Services
{
    public class GarrysItemService : IGarrysItem
    {

        private readonly ModContext _context;

        public GarrysItemService(ModContext context)
        {
            _context = context;

            context.Database.EnsureCreated();
        }


        public async Task<IEnumerable<GarrysItem>> GetAllItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<GarrysItem?> GetItemById(long id)
        {
            var garrysItem = await _context.Items.FindAsync(id);

            if (garrysItem == null)
            {
                return null;
            }
            return garrysItem;
        }


        public async Task<GarrysItem> AddItem(GarrysItem garrysItem)
        {

            _context.Items.Add(garrysItem);
            await _context.SaveChangesAsync();
            return garrysItem;
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
