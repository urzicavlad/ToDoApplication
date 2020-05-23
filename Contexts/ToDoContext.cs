using Microsoft.EntityFrameworkCore;
using System;

namespace ToDoApp.Models
{
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>().HasData(
                new Task
                {
                    Id = 1,
                    Title = "Task 1",
                    Description = "Descritpion",
                    Added = DateTime.Now,
                    Deadline = DateTime.Now.AddDays(2),
                    Importance = Importance.High,
                    State = State.InProgress,
                    ClosedAt = null
                });
        }
    }

}
