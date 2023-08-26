import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';


async function bootstrap() {

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.REDIS,
		options: {
			host: process.env.REDIS_HOST || 'localhost',
			port: 6379
		}
	});
	await app.listen();

	const httpApp = await NestFactory.create(AppModule);

	httpApp.enableCors();

	httpApp.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('planet earth')
		.setDescription('planet earth APIs')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(httpApp, config);
	SwaggerModule.setup('api', httpApp, document);

	await httpApp.listen(3000);
}
bootstrap();
