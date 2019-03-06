import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  errorMessage: String = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;

    this.authService.signinUser(email, password).catch((error) => {
      console.log(error);
      this.errorMessage = error.message;
    });
  }

}
