import { Routes } from '@angular/router';
import path from 'node:path';

export const routes: Routes = [
    {
        path:'',
        loadChildren: ()=> import('../app/video-call/video-call.module').then(m=>m.VideoCallModule)
    }
];
