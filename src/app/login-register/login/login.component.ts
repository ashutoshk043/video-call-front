import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showLogin:boolean=true

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  receiveData(event:any){
    this.showLogin =event.login
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login successful with email:', email, 'and password:', password);
      // You can send the credentials to your backend server here
    } else {
      console.log('Form is not valid');
    }
  }

  signInWithFacebook(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
    //   console.log(user);
    // });
  }

  signInWithGoogle(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
    //   console.log(user); // You can handle the user data here
    // });
  }

  showRegister(status:any){
    this.showLogin = status
  }
  
}
