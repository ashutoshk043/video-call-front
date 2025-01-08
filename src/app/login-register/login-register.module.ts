import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegisterRoutingModule } from './login-register-routing.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
  ]
})
export class LoginRegisterModule { }
