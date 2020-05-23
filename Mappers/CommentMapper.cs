using System.Collections.Generic;
using ToDoApp.Models;
using ToDoApp.ViewModels;

namespace ToDoApplication.Mappers
{
    public class CommentMapper
    {

        public static CommentDto mapToDto(Comment comment)
        {
            CommentDto result = new CommentDto();
            result.Id = comment.Id;
            result.Important = comment.Important;
            result.TaskId = comment.Task.Id;
            result.Text = comment.Text;
            return result;
        }
        
        public static List<CommentDto> mapToDtoList(IEnumerable<Comment> comments)
        {
            List<CommentDto> commentsDto = new List<CommentDto>();
            foreach (Comment c in comments)
            {
                commentsDto.Add(CommentMapper.mapToDto(c));
            }
            return commentsDto;
        }


        public static Comment mapFromDto(CommentDto commentDto)
        {
            Comment result = new Comment();
            result.Id = commentDto.Id;
            result.Id = commentDto.Id;
            result.Important = commentDto.Important;
            result.Text = commentDto.Text;
            return result;
        } 
        
        public static Comment mapFromUpdateDto(UpdateCommentDto updateComment)
        {
            Comment result = new Comment();
            result.Id = updateComment.Id;
            result.Important = updateComment.Important;
            result.Text = updateComment.Text;
            return result;
        } 

        public static Comment mapFromCreateDto(CreateCommentDto createCommentDto)
        {
            Comment result = new Comment();
            result.Important = createCommentDto.Important;
            result.Text = createCommentDto.Text;
            return result;
        }
        
    }
}
