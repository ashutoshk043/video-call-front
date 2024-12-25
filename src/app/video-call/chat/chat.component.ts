import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  title = 'Socket.IO + Angular Chat';
  message = '';
  messages: string[] = [];

  // constructor(private socketService: SocketService) {}

  // ngOnInit(): void {
  //   this.socketService.onMessage((msg: string) => {
  //     this.messages.push(msg);
  //   });
  // }s

  // sendMessage(): void {
  //   if (this.message.trim()) {
  //     this.socketService.sendMessage(this.message);
  //     this.message = ''; // Reset message input
  //   }
  // }
}
