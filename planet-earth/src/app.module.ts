import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

console.log('REDIS_HOST ---- ', process.env.REDIS_HOST);

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'earth-pub',
				transport: Transport.REDIS,
				options: {
					host: process.env.REDIS_HOST || 'localhost',
					port: 6379
				}
			}
		])
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
