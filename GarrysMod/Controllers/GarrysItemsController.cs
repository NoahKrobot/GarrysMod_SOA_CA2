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
    public class GarrysItemsController: ControllerBase
    {
        //private readonly ModContext _context;

        private readonly IGarrysItem _context;

        public GarrysItemsController(IGarrysItem service)
        {
            _context = service;
        }

        // GET: api/GarrysItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTO_GarrysItem>>> GetItems()
        {
            var fetchedItems = await _context.GetAllItems();
            return Ok(fetchedItems);
        }

        // GET: api/GarrysItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DTO_GarrysItem>> GetGarrysItem(int id)
        {
            var garrysItem = await _context.GetItemById(id);

            if (garrysItem == null)
            {
                return NotFound();
            }
            return Ok(garrysItem);
        }

        // PUT: api/GarrysItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGarrysItem(int id, DTO_GarrysItem garrysItem)
        {

            if (id == garrysItem.Id)
            {
                await _context.UpdateItem( id, garrysItem);
                return NoContent();
            }
            return BadRequest();
        }

        // POST: api/GarrysItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DTO_GarrysItem>> PostGarrysItem(DTO_GarrysItem garrysItem)
        {
            var garrysItemCreated = await _context.AddItem(garrysItem);
            return Ok(garrysItemCreated);
        }

        // DELETE: api/GarrysItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarrysItem(int id)
        {
            await _context.DeleteItem(id);  
            return NoContent();
        }
    }
}
