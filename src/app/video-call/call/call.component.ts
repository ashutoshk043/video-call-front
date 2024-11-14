import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [ChatComponent,CommonModule],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css'
})
export class CallComponent {
  isChatOpen: boolean = true;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
