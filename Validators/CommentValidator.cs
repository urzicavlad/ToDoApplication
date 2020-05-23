using FluentValidation;
using ToDoApp.ViewModels;

namespace ToDoApp.ModelValidators
{
    public class CommentValidator : AbstractValidator<CreateCommentDto>
    {
        public CommentValidator()
        {
            RuleFor(c => c.Text.Length).GreaterThan(5);
        }
    }
}
