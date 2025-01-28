import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialAuthService, SocialLoginModule, SocialUser, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CryptoService } from '../../services/crypto.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDetailsService } from '../../services/userdetails.service';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, CommonModule, ReactiveFormsModule, SocialLoginModule, GoogleSigninButtonModule, HttpClientModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showLogin: boolean = true
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;
  apiURL = ''

  constructor(private userDetailsService:UserDetailsService,  private router :Router, private toastr: ToastrService,private fb: FormBuilder, private authService: SocialAuthService, private httpClient: HttpClient, private crypto: CryptoService,  private cookieService: CookieService) {
    this.apiURL = environment.apiUrl
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.signInwithGoogle(this.user)
      }
    });
    this.createLoginFOrm();
  }

  ngOnInit(){
    
  }


  createLoginFOrm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  receiveData(event: any) {
    this.showLogin = event.login
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

  signInwithGoogle(userDetails: any): void {
    const encData = this.crypto.encryptData(userDetails)
    this.httpClient.post(`${this.apiURL}/api/user/login-google`, { encData }).subscribe((res: any) => {
      const responce = this.crypto.decryptData(res.data)
      this.cookieService.set('auth', responce?.token, {
        expires: 8, // Expiry time in hours
        sameSite: 'None', // Cookie will work with cross-site requests
        secure: true,     // Required for `SameSite: None`
      });
      this.userDetailsService.decodeTokenAndSetUser()
      this.toastr.success("Logged in successfully");
      this.router.navigate(['/connect'])
    })
  }

  showRegister(status: any) {
    this.showLogin = status
  }

}
