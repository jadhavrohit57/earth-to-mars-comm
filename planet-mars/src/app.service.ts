import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
	constructor(@Inject('mars-pub') private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  publishEvent(message: string): string {
		this.client.emit('from-mars', message);
		return 'success';
	}
}


// 8444447777 633777777772433 4447777 3337776666 332777844

// 8444447777 633777777772433 4447777 3337776666 627777777