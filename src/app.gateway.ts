import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(4001, { transport: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('AppGateway');

  handleConnection(client) {
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client) {
    this.logger.log('Client disconnected');
  }

  publish(topic: string, payload: any): void {
    this.server.emit(topic, JSON.stringify(payload));
  }

  @SubscribeMessage('mobileToClient')
  mobileToClientPublish(client: any, data: any): void {
    this.server.emit('serverToClient', data);
  }
}
