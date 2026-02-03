import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'signin',
    loadComponent:() =>import('./components/auth/login/login').then((m) => m.Login)
  },
  
  {
    path: 'signup',
    loadComponent:() =>import('./components/auth/register/register').then((m) => m.Register)
  }
];
