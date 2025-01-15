import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallComponent } from './call/call.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path:'connect',
    component:AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoCallRoutingModule { }
