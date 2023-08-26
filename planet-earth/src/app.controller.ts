import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

class MessageDTO {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'this message is from earth' })
	message: string;
}


@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	// send message from earth to mars
	@Post('/api/earth-mars-comm/message')
	sendToMars(@Body() body: MessageDTO) {
		this.appService.publishEvent(body.message);
		return 'message sent to mars';
	}

	@EventPattern('toEarth')
	async handleBookCreatedEvent(data: any) {
		console.log('message recieved from Mars - ', data);
	}
}
