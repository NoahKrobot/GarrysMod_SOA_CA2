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
    public class MapsController : ControllerBase
    {
        //private readonly ModContext _context;

        private readonly IMap _context;

        public MapsController(IMap service)
        {
            _context = service;
        }

        // GET: api/Maps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTO_Map>>> GetMaps()
        {
            var fetchedItems = await _context.GetAllMaps();
            return Ok(fetchedItems);
        }

        // GET: api/Maps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DTO_Map>> GetMap(int id)
        {
            var map = await _context.GetMapById(id);

            if (map == null)
            {
                return NotFound();
            }
            return Ok(map);
        }

        // PUT: api/Maps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMap(int id, DTO_Map map)
        {
            if (id == map.Id)
            {
                await _context.UpdateMap(id, map);
                return NoContent();
            }
            return BadRequest();
        }

        // POST: api/Maps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DTO_Map>> PostMap(DTO_Map map)
        {
            var createdMap = await _context.AddMap(map);
            return Ok(createdMap);
        }

        // DELETE: api/Maps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMap(int id)
        {
            await _context.DeleteMap(id);
            return NoContent();
        }
    }
}
