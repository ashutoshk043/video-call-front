import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [ChatComponent,CommonModule],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css'
})
export class CallComponent {
  isChatOpen: boolean = false;
  userCount:number = 0
  userCountChange:string = 'users-increased'
  unReadChatsCount:any

  toggleChat() {
    this.unReadChatsCount = ''
    this.isChatOpen = !this.isChatOpen;
  }

  constructor(private socketService:SocketService){

  }

  ngOnInit(){
    this.socketService.onUserCount((count: number) => {
      this.userCountChange = count > this.userCount ? 'users-increased' : 'users-decreased';
      this.userCount = count;
      
    });
  }
}
