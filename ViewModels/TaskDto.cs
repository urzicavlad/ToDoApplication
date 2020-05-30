using System;

namespace ToDoApp.ViewModels
{
    public class TaskDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Added { get; set; }
        public DateTime Deadline { get; set; }
        public string Importance { get; set; }
        public string State { get; set; }
        public DateTime? ClosedAt { get; set; }
        public long NumberOfComments { get; set; }

    }
}
