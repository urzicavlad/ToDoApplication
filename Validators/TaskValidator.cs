using FluentValidation;
using System;
using ToDoApp.ViewModels;

namespace ToDoApp.ModelValidators
{
    public class TaskValidator : AbstractValidator<CreateTaskDto>
    {
        public TaskValidator()
        {
            RuleFor(t => t.Added).LessThanOrEqualTo(DateTime.Now);
            RuleFor(t => t.Title).Length(1, 100);
            RuleFor(t => t.Description).Length(1, 300);
            RuleFor(t => t.Added).LessThan(t => t.Deadline);
        }
    }
}
