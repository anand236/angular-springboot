import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [CardModule, ReactiveFormsModule, InputTextModule, CheckboxModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService]
})
export class Login {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginSer = inject(LoginService);
  private toastSer = inject(MessageService);

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  hidePassword = signal(true);
  hideConfPassword = signal(true);
  loginScreen = signal(true);



  ngOnInit(): void {
    localStorage.removeItem("token");
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  saveUserForm(event: any) {

    if (this.loginScreen()) {
      if (this.loginForm.valid) {
        this.loginSer.loginUser(this.loginForm.value).subscribe({
          next: (res: any) => {
            switch (res?.message) {
              case "login successfull":

                this.toastSer.add({ severity: 'success', summary: 'Success', detail: 'login successfull' });
                localStorage.setItem("token", res.token);
                this.router.navigate(['/student'])
                break;
              case "wrong credential":
                this.toastSer.add({ severity: 'warn', summary: 'Sorry!', detail: 'wrong credential' });
                this.loginForm.reset();
                break;
              default:
                this.toastSer.add({ severity: 'error', summary: 'Oops!', detail: 'User not found!' });
                this.loginForm.reset();
            }
          },
          error: (err) => {
            console.log(err);

          }
        });
      }
    }
    else {
      console.log(this.registerForm.value);
      if (this.registerForm.valid) {
        this.loginSer.registerUser(this.registerForm.value).subscribe({
          next: (res: any) => {
            console.log(res?.message);
            switch (res?.message) {
              case "Email already exists":
                this.toastSer.add({ severity: 'warn', summary: 'Warn', detail: 'Email Already Exists, Try logging in' });
                this.registerForm.reset();
                break;
              case "same password already exists":
                this.toastSer.add({ severity: 'warn', summary: 'Warn', detail: 'same password already exists' });
                this.registerForm.reset();
                break;
              case "Password do not matched":
                this.toastSer.add({ severity: 'warn', summary: 'Warn', detail: 'Password do not matched' });
                this.registerForm.reset();
                break;
              default:
                this.toastSer.add({ severity: 'success', summary: 'Success', detail: 'Account Created Successfully!' });
                this.loginScreen.update((login) => !login);
            }
          },
          error: (err) => {
            console.log(err);

          }
        });
      }
    }


  }

  changePasswordIcon() {
    this.hidePassword.update((hidePass) => !hidePass);
  }

  changeConfirmPasswordIcon() {
    this.hideConfPassword.update((hidePass) => !hidePass);

  }

  registerAccount() {
    this.loginScreen.update((login) => !login);
    this.loginForm.reset();
    this.registerForm.reset();
  }
}
