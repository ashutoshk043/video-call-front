import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  title = 'Socket.IO + Angular Chat';
  message = '';
  messages: {text: string; sender: 'me' | 'other'}[] = [];
  userCount = 0

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    
    this.socketService.onMessage((msg: string) => {
      this.messages.push({text: msg, sender: 'other'});
    });
  }

  sendMessage(): void {
    if (this.message.trim().length > 0 ) {
      this.socketService.sendMessage(this.message.trim());
      this.messages.push({text: this.message.trim(), sender: 'me'});
      this.message = ''; // Reset message input
    }
  }
  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
