using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Models;
using ToDoApp.ViewModels;
using ToDoApplication.Mappers;

namespace ToDoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ToDoContext _context;

        public CommentsController(ToDoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments()
        {
            var comments = await _context.Comments
                                    .Include(c => c.Task)
                                    .ToListAsync();
            return Ok(CommentMapper.mapToDtoList(comments));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetComment(long id)
        {
            var comment = await _context.Comments
                                    .Include(c => c.Task)
                                    .FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(CommentMapper.mapToDto(comment));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(long id, UpdateCommentDto updateCommentDto)
        {
            if (id != updateCommentDto.Id)
            {
                return BadRequest();
            }

            var commentEntity = CommentMapper.mapFromUpdateDto(updateCommentDto);

            _context.Entry(commentEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentDto>> DeleteComment(long id)
        {
            var comment = await _context.Comments
                                            .Include(c => c.Task)
                                            .FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return CommentMapper.mapToDto(comment);
        }

        private bool CommentExists(long id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
