import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket = io('http://localhost:3000');
  
  joinRoom(room: string) {
    this.socket.emit('join-room', room);
  }

  sendMessage(message: { user: string; message: string }) {
    this.socket.emit('send-message', message);
  }

  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receive-message', (message) => {
        observer.next(message);
      });
    });
  }
}
