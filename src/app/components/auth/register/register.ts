import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
  export class Register {

    signUpForm: FormGroup;

  constructor(private fb:FormBuilder, private auth: AuthService, private router:Router){
    this.signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
    })
  }
  onSignUp(){
    if (this.signUpForm.invalid) return;
    
    this.auth.register(this.signUpForm.value).subscribe({
      next: (res) => {
        this.auth.saveTokens(res);
        this.router.navigateByUrl('/');
      },
      error: () => alert('Registration failed')
    })
  }
}
