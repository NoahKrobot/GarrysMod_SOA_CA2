using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GarrysMod.Models;
using GarrysMod.DTOs;
using GarrysMod.Interfaces;

namespace GarrysMod.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        //private readonly ModContext _context;

        private readonly ICategory _context;

        public CategoriesController(ICategory service)
        {
            _context = service;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DTO_Category>>> GetCategories()
        {
            var fetchedItems = await _context.GetAllCategories();
            return Ok(fetchedItems);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DTO_Category>> GetCategory(int id)
        {
            var garrysItem = await _context.GetCategoryById(id);

            if (garrysItem == null)
            {
                return NotFound();
            }
            return Ok(garrysItem);
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id == category.Id)
            {
                await _context.UpdateCategory(id,category);
                return NoContent();
            }
            return BadRequest();
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DTO_Category>> PostCategory(Category category)
        {
            var garrysItemCreated = await _context.AddCategory(category);
            return Ok(garrysItemCreated);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _context.DeleteCategory(id);
            return NoContent();
        }

      
    }
}
