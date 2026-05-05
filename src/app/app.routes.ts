import { Routes } from '@angular/router';
import { Student } from './features/student/student';
import { Dashboard } from './features/dashboard';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
  {
    path: 'home', component: Dashboard, canActivate: [authGuard]
  },
  {
    path: 'student', component: Student, canActivate: [authGuard]
  },
  {
    path: '',
    loadChildren: () => import("./features/auth/auth.routes").then(auth => auth.authRoute)
  }
];
