using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GarrysMod.Models;

namespace GarrysMod.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GarrysItemsController : ControllerBase
    {
        private readonly ModContext _context;

        public GarrysItemsController(ModContext context)
        {
            _context = context;
        }

        // GET: api/GarrysItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GarrysItem>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        // GET: api/GarrysItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GarrysItem>> GetGarrysItem(long id)
        {
            var garrysItem = await _context.Items.FindAsync(id);

            if (garrysItem == null)
            {
                return NotFound();
            }

            return garrysItem;
        }

        // PUT: api/GarrysItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGarrysItem(long id, GarrysItem garrysItem)
        {
            if (id != garrysItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(garrysItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GarrysItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GarrysItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GarrysItem>> PostGarrysItem(GarrysItem garrysItem)
        {
            _context.Items.Add(garrysItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGarrysItem), new { id = garrysItem.Id }, garrysItem);
        }

        // DELETE: api/GarrysItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarrysItem(long id)
        {
            var garrysItem = await _context.Items.FindAsync(id);
            if (garrysItem == null)
            {
                return NotFound();
            }

            _context.Items.Remove(garrysItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GarrysItemExists(long id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}
