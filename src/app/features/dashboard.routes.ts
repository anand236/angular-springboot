import { Routes } from "@angular/router";
import { Dashboard } from "./dashboard";
import { Student } from "./student/student";
import { Cards } from "./cards/cards";
import { authGuard } from "../core/guard/auth-guard";

export const dashboardRoute: Routes = [

  {
    path: '', component: Dashboard, canActivate: [authGuard],
    children: [
      {
        path: '', component: Cards
      },
      {
        path: 'student', component: Student
      }
    ]
  },
]
