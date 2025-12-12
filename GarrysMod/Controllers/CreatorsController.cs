using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GarrysMod.Models;
using GarrysMod.Interfaces;
using GarrysMod.DTOs;

namespace GarrysMod.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreatorsController : ControllerBase
    {
        //private readonly ModContext _context;

        private readonly ICreator _context;
        public CreatorsController(ICreator service)
        {
            _context = service;

        }

        // GET: api/Creators
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTO_Creator>>> GetCreators()
        {
            var fetchedItems = await _context.GetAllCreators();
            return Ok(fetchedItems);
        }

        // GET: api/Creators/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DTO_Creator>> GetCreator(int id)
        {
            var creator = await _context.GetCreatorById(id);

            if (creator == null)
            {
                return NotFound();
            }
            return Ok(creator);
        }

        // PUT: api/Creators/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCreator(int id, DTO_Creator creator)
        {
            if (id == creator.ID)
            {
                await _context.UpdateCreator(id, creator);
                return NoContent();
            }
            return BadRequest();
        }

        // POST: api/Creators
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DTO_Creator>> PostCreator(DTO_Creator creator)
        {
            var creatorCreated = await _context.AddCreator(creator);
            return Ok(creatorCreated);
        }

        // DELETE: api/Creators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCreator(int id)
        {
            await _context.DeleteCreator(id);
            return NoContent();
        }
    }
}
