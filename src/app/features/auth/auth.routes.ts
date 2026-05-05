import { Routes } from "@angular/router";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { ForgotPassword } from "./forgot-password/forgot-password";

export const authRoute: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: Login
  },
  {
    path: 'register', component: Register
  },
  {
    path: 'forgot-password', component: ForgotPassword
  }
]
