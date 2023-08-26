import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {name: 'earth-pub',transport: Transport.REDIS,
      options : {
        host: 'redis',
        port: 6379
      }
    }
    ])

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
