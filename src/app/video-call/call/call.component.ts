import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { SocketService } from '../../services/socket.service';
import { UserDetailsService } from '../../services/userdetails.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [ChatComponent,CommonModule, FooterComponent],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css'
})
export class CallComponent {
  isChatOpen: boolean = false;
  userCount:number = 0
  userCountChange:string = 'users-increased'
  unReadChatsCount:any
  loginUser:any = ''

  toggleChat() {
    this.unReadChatsCount = ''
    this.isChatOpen = !this.isChatOpen;
  }

  constructor(private socketService:SocketService, private userDetailsService:UserDetailsService){

  }

  ngOnInit(){
    this.socketService.onUserCount((count: number) => {
      this.userCountChange = count > this.userCount ? 'users-increased' : 'users-decreased';
      this.userCount = count;
      
    });

    this.userDetailsService.getUserData().subscribe((res:any)=>{
      this.loginUser = res?.firstName
    })
  }
}
