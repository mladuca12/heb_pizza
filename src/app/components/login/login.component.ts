import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  isLoading = false;
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    this.isLoading = true;
    this.authService
      .login(
        this.loginForm.value.username ?? '',
        this.loginForm.value.password ?? ''
      )
      .subscribe({
        next: (token) => {
          console.log(token);
          this.isLoading = false;
          this.isError = false;
        },
        error: () => {
          this.isError = true;
          this.isLoading = false;
        },
      });
  }
}
