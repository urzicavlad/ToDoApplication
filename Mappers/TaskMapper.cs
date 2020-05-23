using System;
using System.Collections.Generic;
using ToDoApp.Models;
using ToDoApp.ViewModels;

namespace ToDoApplication.Mappers
{
    public class TaskMapper
    {

        public static TaskDto mapToDto(Task task) {
            TaskDto result = new TaskDto();
            result.Id = task.Id;
            result.Title = task.Title;
            result.Description = task.Description;
            result.Added = task.Added;
            result.Deadline = task.Deadline;
            result.Importance = task.Importance.ToString();
            result.State = task.State.ToString();
            result.ClosedAt = task.ClosedAt;
            return result;
        }

        public static List<TaskDto> mapToDtoList(IEnumerable<Task> tasks)
        {
            List<TaskDto> tasksDto = new List<TaskDto>();
            foreach (Task task in tasks)
            {
                tasksDto.Add(TaskMapper.mapToDto(task));
            }
            return tasksDto;
        }


        public static Task mapFromDto(TaskDto taskDto)
        {
            Task result = new Task();
            result.Id = taskDto.Id;
            result.Title = taskDto.Title;
            result.Description = taskDto.Description;
            result.Added = taskDto.Added;
            result.Deadline = taskDto.Deadline;
            result.Importance = Importance.High;
            result.State = State.Closed;
            result.ClosedAt = taskDto.ClosedAt;
            return result;
        }

        public static Task mapFromCreateTask(CreateTaskDto createTaskDto)
        {
            Task result = new Task();
            result.Title = createTaskDto.Title;
            result.Description = createTaskDto.Description;
            result.Added = createTaskDto.Added;
            result.Deadline = createTaskDto.Deadline;
            result.Importance = (Importance) Enum.Parse(typeof(Importance), createTaskDto.Importance);
            result.State = (State)Enum.Parse(typeof(State), createTaskDto.State); ;
            return result;
        }

    }

}
