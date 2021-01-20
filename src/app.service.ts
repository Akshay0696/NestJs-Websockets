import { Injectable } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Injectable()
export class AppService {
    constructor(private gateway: AppGateway) { }
    getHello(): string {
        this.gateway.publish('task', { taskId: 123 });
        return 'akshay';
    }

    logout(): string {
        this.gateway.publish('logout', { taskId: 123 });
        return 'akshay';
    }
}