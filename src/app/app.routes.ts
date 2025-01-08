import { Routes } from '@angular/router';
import path from 'node:path';

export const routes: Routes = [
    {
        path:'',
        loadChildren: ()=> import('../app/login-register/login-register.module').then(m=>m.LoginRegisterModule)
    },
    {
        path:'',
        loadChildren: ()=> import('../app/video-call/video-call.module').then(m=>m.VideoCallModule)
    }
];
