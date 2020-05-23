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

    }

}
