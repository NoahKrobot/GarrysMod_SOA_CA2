using GarrysMod.DTOs;
using GarrysMod.Interfaces;
using GarrysMod.Models;
using GarrysMod.Services;
using Humanizer;
using Microsoft.EntityFrameworkCore;

namespace GarrysMod.Services
{
    public class CreatorService : ICreator
    {

        private readonly ModContext _context;

        private DTO_Creator DTOMapping(Creator creator)
        {
            return new DTO_Creator
            {

                ID = creator.ID,
                Username = creator.Username,
                IsAdmin = creator.IsAdmin,
            };
        }

        public CreatorService(ModContext context)
        {
            _context = context;

            context.Database.EnsureCreated();
        }

        public ModContext Get_context()
        {
            return _context;
        }


        public async Task<IEnumerable<DTO_Creator>> GetAllCreators()
        {
            var creators = await _context.Creators.ToListAsync();
            return creators.Select(DTOMapping);
        }

        public async Task<DTO_Creator?> GetCreatorById(long id)
        {

            var creator= await _context.Creators.FirstOrDefaultAsync();

            if (creator == null)
            {
                return null;
            }

            return DTOMapping(creator);
        }

        public async Task<DTO_Creator> AddCreator(DTO_Creator creator)
        {

            var creatorObject = new Creator
            {
                Username = creator.Username,
                IsAdmin = creator.IsAdmin,
            };

            _context.Creators.Add(creatorObject);
            await _context.SaveChangesAsync();
            return DTOMapping(creatorObject);
        }

        public async Task UpdateCreator(long id, DTO_Creator creatorDTO)
        {

            var creatorFound = await _context.Creators.FindAsync(id);

            creatorFound.Username = creatorDTO.Username;
            creatorFound.IsAdmin = creatorDTO.IsAdmin;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteCreator(long id)
        {
            var creator = await _context.Creators.FindAsync(id);
            _context.Creators.Remove(creator);
            await _context.SaveChangesAsync();
        }
    }
}
