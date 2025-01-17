import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialAuthService, SocialLoginModule, SocialUser,GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, CommonModule, ReactiveFormsModule,SocialLoginModule,GoogleSigninButtonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showLogin:boolean=true
  user : SocialUser = new SocialUser();
  loggedIn: boolean=false;

  constructor(private fb: FormBuilder, private authService: SocialAuthService, private httpClient:HttpClient) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        this.signInwithGoogle(this.user)
      }
    });
    this.createLoginFOrm();
  }


  createLoginFOrm(){
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

  signInwithGoogle(userDetails:any): void {
    console.log(userDetails)
    this.httpClient.post('/api/login-with-google', {userDetails}).subscribe((res:any)=>{
      console.log(res)
    })
  }

  showRegister(status:any){
    this.showLogin = status
  }
  
}
