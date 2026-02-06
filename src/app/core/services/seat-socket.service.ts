import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class SeatSocketService {
private socket?: WebSocket;

  connect(showId: number, onMessage: (data: any) => void) {
    this.socket = new WebSocket(
      `${environment.wsUrl}/seats/${showId}/`
    );

    this.socket.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };
  }

  disconnect() {
    this.socket?.close();
  }
}
