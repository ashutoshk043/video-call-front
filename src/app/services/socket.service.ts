import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private isConnected = false;

  constructor() {
    // Initialize the socket with autoConnect disabled
    this.socket = io('http://localhost:3000', { autoConnect: true, transports: ['websocket'] });
  }

  // Ensure connection
  private ensureConnection(): void {
    if (!this.isConnected) {
      this.socket.connect(); // Connect if not already connected
      this.isConnected = true;

      // Handle socket connection and disconnection events
      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.id);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        this.isConnected = false;
      });
    }
  }

  // Method to send a message to the server
  sendMessage(message: string): void {
    console.log('Sending message:', message);
    this.ensureConnection(); // Ensure the socket is connected
    this.socket.emit('message', message); // Emit the message
  }

  // Method to listen for incoming messages
  onMessage(callback: (message: string) => void): void {
    console.log('Listening for messages');
    this.ensureConnection(); // Ensure the socket is connected
    this.socket.on('message-txfr', callback); // Listen for 'message' events
  }
  disconnect(): void {
    this.socket.disconnect();
  }
}
