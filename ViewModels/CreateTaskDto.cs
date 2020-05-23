using System;

namespace ToDoApp.ViewModels
{
    public class CreateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Added { get; set; }
        public DateTime Deadline { get; set; }
        public string Importance { get; set; }
        public string State { get; set; }
    }
}
