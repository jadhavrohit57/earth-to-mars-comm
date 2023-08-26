import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

class MessageDTO {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: '8444$447777 6337777$77772433 4447777 333777666$6 62777$7777' }) // ex- this message is from mars
	message: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
	getHello(): string {
		return this.appService.getHello();
	}

	// send message from Mars to Earth
	@Post('/api/earth-mars-comm/message')
	sendToMars(@Body() body: MessageDTO) {
		this.appService.publishEvent(body.message);
		return 'message sent to earth';
	}

	@EventPattern('toMars')
	async handleBookCreatedEvent(data: any) {
		console.log('message recieved from Earth  - ', data);
	}
}
