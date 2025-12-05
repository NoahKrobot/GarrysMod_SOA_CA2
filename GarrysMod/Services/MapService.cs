using GarrysMod.DTOs;
using GarrysMod.Interfaces;
using GarrysMod.Models;
using Microsoft.EntityFrameworkCore;

namespace GarrysMod.Services
{
    public class MapService : IMap
    {

        private readonly ModContext _context;
        private DTO_Map DTOMapping(Map map)
        {
            return new DTO_Map
            {
                Id = map.Id,
                Name = map.Name,
                Description = map.Description,
                SizeInMB = map.SizeInMB,
            };
        }

        public MapService(ModContext context)
        {
            _context = context;

            context.Database.EnsureCreated();
        }

        public ModContext Get_context()
        {
            return _context;
        }
        public async Task<IEnumerable<DTO_Map>> GetAllMaps()
        {
            var maps = await _context.Maps.ToListAsync();
            return maps.Select(DTOMapping);
        }
        public async Task<DTO_Map?> GetMapById(long id)
        {
            var map = await _context.Maps.FirstOrDefaultAsync();

            if (map == null)
            {
                return null;
            }

            return DTOMapping(map);
        }

        public async Task<DTO_Map> AddMap(Map map)
        {
            _context.Maps.Add(map);
            await _context.SaveChangesAsync();
            return DTOMapping(map);
        }

        public async Task DeleteMap(long id)
        {
            var map = await _context.Maps.FindAsync(id);

            _context.Maps.Remove(map);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateMap(long id, Map map)
        {
            _context.Entry(map).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
