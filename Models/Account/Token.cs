
using System;

namespace ToDoApp.Models.Account
{
    public class Token
    {

        public string Value { get; set; }

        public DateTime Expiry { get; set; }

        public string Email { get; set; }
    }
}