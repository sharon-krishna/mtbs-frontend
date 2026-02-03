import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model.ts';
import { environment } from '../../../environments/environment.js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl
    
    isLoggedIn = signal<boolean>(this.hasToken());
    
    constructor(private http: HttpClient){}
    
    login(data: LoginRequest){
      return this.http.post<AuthResponse>(
        `${this.apiUrl}/accounts/login/`, data
      );
    }
    
    register(data: RegisterRequest){
      return this.http.post<AuthResponse>(
        `${this.apiUrl}/accounts/register/`, data
      )
    }
    
    saveTokens(response: AuthResponse){
      localStorage.setItem('access', response.access)
      localStorage.setItem('refresh', response.refresh)
      this.isLoggedIn.set(true)
    }
    
    logout(){
      localStorage.clear()
      this.isLoggedIn.set(false)
    }
    
    private hasToken(): boolean{
      return !!localStorage.getItem('access')
    }
  }
