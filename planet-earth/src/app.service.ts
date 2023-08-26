import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AppService {
	constructor(@Inject('earth-pub') private client: ClientProxy) {}

	getHello(): string {
		return 'Hello World!';
	}

	publishEvent(message: string): string {
		this.client.emit('from-earth', message);
		return 'success';
	}
}
