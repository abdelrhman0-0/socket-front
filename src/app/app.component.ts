import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './web-socket.service';
import { NgFor, CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  messages: any[] = [];
  user: string = '';
  message: string = '';

  constructor(private webSocketService: WebSocketService, private http: HttpClient) {}

  ngOnInit() {
    this.webSocketService.joinRoom("room1");
    // Fetch past messages
    this.http.get<any[]>('http://localhost:3000/messages').subscribe((data) => {
      this.messages = data;
    });

    // Receive real-time messages
    this.webSocketService.receiveMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.message) {
      this.webSocketService.sendMessage({ user: this.user, message: this.message });
      this.message = '';
    }
  }
}
