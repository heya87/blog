import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;
  emailInput: string;

  constructor(public authService: AuthService) {}


  onSignup(signupForm: NgForm) {
    if(signupForm.invalid) {
      return;
    }
    this.authService.createUser(signupForm.value.email, signupForm.value.password);
  }
}
