import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
  export class Login {

    signInForm: FormGroup;

    constructor(private fb:FormBuilder, private auth: AuthService, private router:Router){
      this.signInForm = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required]]
        })
     }
    onSignIn(){
    if (this.signInForm.invalid) return;
    
    this.auth.login(this.signInForm.value).subscribe({
      next: (res) => {
      this.auth.saveTokens(res);
      this.router.navigateByUrl('/');
    },
    error: () => alert('Invalid credentials')
    });
    }
}
