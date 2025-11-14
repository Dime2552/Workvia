using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Workvia.Core.DTO
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Name can`t be blank")]
        public string PersonName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email can`t be blank")]
        [EmailAddress(ErrorMessage = "Email should be in a proper email adress format")]
        [Remote(action: "IsEmailAlreadyRegister", controller: "Account", ErrorMessage = "Email is already in use")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password can`t be blank")]
        public string Password {  get; set; } = string.Empty;

        [Required(ErrorMessage = "ConfirmPassword can`t be blank")]
        [Compare("Password", ErrorMessage = "Password and confirm password do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;

        public bool IsAdmin { get; set; } = false;
    }
}
