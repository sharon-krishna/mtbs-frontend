import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  {
    path: 'signin',
    loadComponent:() =>import('./components/auth/login/login').then((m) => m.Login)
    },

  {
    path: 'signup',
    loadComponent:() =>import('./components/auth/register/register').then((m) => m.Register)
    },

  {
    path:'',
    canActivate:[authGuard],
    loadComponent:() =>import('./components/user/user/user').then(m => m.User)
  },
  
  {
    path: '',
    canActivate: [authGuard],
    loadComponent:() =>import('./components/user/movie-list/movie-list').then(m => m.MovieList)
  },
  
  {
    path: 'movies/:id/shows',
    canActivate: [authGuard],
    loadComponent:() =>import('./components/user/show-list/show-list').then(m => m.ShowList)
  },


  {
    path:'admin',
    canActivate:[authGuard],
    loadComponent:() =>import('./components/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
    children: [
      {
        path:'movies',
        loadComponent:() =>import('./components/admin/movies/movie-list/movie-list').then(m => m.MovieList)
      }
    ]
  },
  
  {
  path: 'shows/:id/seats',
  canActivate: [authGuard],
  loadComponent:() =>import('./components/user/seat-selection/seat-selection').then(m => m.SeatSelection)
}
];
