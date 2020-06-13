using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Models;
using ToDoApp.ViewModels;
using ToDoApplication.Mappers;
using Task = ToDoApp.Models.Task;

namespace ToDoApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ToDoContext _context;
        

        public TasksController(ToDoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks(DateTime? from = null, DateTime? to = null)
        {

            var result = _context.Tasks as IQueryable<Task>;

            if (from != null)
            {
                result = result.Where(t => t.Deadline > from);
            }
            if (to != null)
            {
                result = result.Where(t => t.Deadline < to);
            }

            var tasksFromRepository = await result.ToListAsync();
            List<TaskDto> tasksDto = TaskMapper.mapToDtoList(tasksFromRepository);
            tasksDto.ForEach(e =>
            e.NumberOfComments = _context.Comments
            .Where(c => c.Task.Id == e.Id)
            .Include(c => c.Task).ToList().Count);
            return Ok(tasksDto);
        }


        [HttpGet("{taskId}")]
        public async Task<ActionResult<TaskDto>> GetTask(long taskId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskId);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(TaskMapper.mapToDto(task));
        }


        [HttpPut("{taskId}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> PutTask(long taskId, TaskDto task)
        {
            if (taskId != task.Id)
            {
                return BadRequest();
            }

            var taskEntity = TaskMapper.mapFromDto(task);

            if (taskEntity.State == State.Closed)
            {
                taskEntity.ClosedAt = DateTime.Now;
            }

            var oldTask = _context.Tasks
                                    .AsNoTracking()
                                    .FirstOrDefault(t => t.Id == taskId);
            if (oldTask.State == State.Closed && taskEntity.State != State.Closed)
            {
                taskEntity.ClosedAt = null;
            }

            _context.Entry(taskEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(taskId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            List<TaskDto> states = new List<TaskDto>();
            states.Add(TaskMapper.mapToDto(oldTask));
            states.Add(task);
            return states;
        }


        [HttpPost]
        public async Task<ActionResult<TaskDto>> PostTask(CreateTaskDto createTaskDto)
        {
            var taskEntity = TaskMapper.mapFromCreateTask(createTaskDto);

            _context.Tasks.Add(taskEntity);
            await _context.SaveChangesAsync();

            return Ok(TaskMapper.mapToDto(taskEntity));
        }


        [HttpDelete("{taskId}")]
        public async Task<ActionResult<TaskDto>> DeleteTask(long taskId)
        {
            var task = await _context.Tasks
                                        .Include(t => t.Comments)
                                        .FirstOrDefaultAsync(t => t.Id == taskId);
            if (task == null)
            {
                return NotFound();
            }

            if (task.Comments.Count != 0)
            {
                return BadRequest("Task Coments needs to be deleted first!");
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return Ok(TaskMapper.mapToDto(task));
        }

        [HttpGet("{taskId}/comments")]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments(long taskId)
        {
            var comments = await _context.Comments
                                    .Where(c => c.Task.Id == taskId)
                                    .Include(c => c.Task)
                                    .ToListAsync();
            
            return Ok(CommentMapper.mapToDtoList(comments));
        }


        [HttpPost("{taskId}/comments")]
        public async Task<ActionResult<CommentDto>> PostComment(long taskId, CreateCommentDto commentDto)
        {
            var task = await _context.Tasks.Include(t => t.Comments).FirstOrDefaultAsync(t => t.Id == taskId);

            var comment = CommentMapper.mapFromCreateDto(commentDto);
            task.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(CommentMapper.mapToDto(comment));
        }

        private bool TaskExists(long id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }



    }
}
